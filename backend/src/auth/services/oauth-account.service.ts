import { Injectable, Logger } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { PinterestOAuthService } from './pinterest-oauth.service';
import type { PinterestTokenResponse } from '../types/pinterest.types';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class OAuthAccountService {
   private readonly logger = new Logger(OAuthAccountService.name);
   private readonly refreshSkewMs = 2 * 60 * 1000;

   constructor(
      private readonly appConfig: AppConfigService,
      private readonly prismaService: PrismaService,
      private readonly pinterestOAuthService: PinterestOAuthService,
   ) {}

   async upsertPinterestUser(
      providerUserId: string,
      providerUsername: string | null,
      providerProfileImageUrl: string | null,
      tokenPayload: PinterestTokenResponse,
   ) {
      const expiresAt = tokenPayload.expires_in ? new Date(Date.now() + tokenPayload.expires_in * 1000) : null;

      return this.prismaService.$transaction(async (tx) => {
         const existingAccount = await tx.oAuthAccount.findUnique({
            where: {
               provider_providerUserId: {
                  provider: 'pinterest',
                  providerUserId,
               },
            },
            include: { user: true },
         });

         if (existingAccount) {
            await tx.oAuthAccount.update({
               where: { id: existingAccount.id },
               data: {
                  accessTokenEncrypted: this.encrypt(tokenPayload.access_token),
                  refreshTokenEncrypted: tokenPayload.refresh_token
                     ? this.encrypt(tokenPayload.refresh_token)
                     : existingAccount.refreshTokenEncrypted,
                  providerUsername: providerUsername ?? existingAccount.providerUsername,
                  providerProfileImageUrl:
                     providerProfileImageUrl ?? existingAccount.providerProfileImageUrl,
                  scope: tokenPayload.scope,
                  expiresAt,
               },
            });

            return existingAccount.user;
         }

         return tx.user.create({
            data: {
               oauthAccounts: {
                  create: {
                     provider: 'pinterest',
                     providerUserId,
                     providerUsername,
                     providerProfileImageUrl,
                     accessTokenEncrypted: this.encrypt(tokenPayload.access_token),
                     refreshTokenEncrypted: tokenPayload.refresh_token
                        ? this.encrypt(tokenPayload.refresh_token)
                        : null,
                     scope: tokenPayload.scope,
                     expiresAt,
                  },
               },
            },
         });
      });
   }

   async refreshPinterestIfNeeded(
      account: { id: string; providerUserId: string; refreshTokenEncrypted: string | null; expiresAt: Date | null },
      session: { id: string; userId: string },
   ) {
      if (!account.expiresAt || account.expiresAt.getTime() > Date.now() + this.refreshSkewMs) {
         return true;
      }

      if (!account.refreshTokenEncrypted) {
         await this.revokeSession(session.id);
         return false;
      }

      try {
         const refreshToken = this.decrypt(account.refreshTokenEncrypted);
         const refreshed = await this.pinterestOAuthService.refreshToken(refreshToken);
         const refreshedExpiresAt = refreshed.expires_in
            ? new Date(Date.now() + refreshed.expires_in * 1000)
            : null;

         await this.prismaService.oAuthAccount.update({
            where: { id: account.id },
            data: {
               accessTokenEncrypted: this.encrypt(refreshed.access_token),
               refreshTokenEncrypted: refreshed.refresh_token
                  ? this.encrypt(refreshed.refresh_token)
                  : account.refreshTokenEncrypted,
               scope: refreshed.scope,
               expiresAt: refreshedExpiresAt,
            },
         });

         return true;
      } catch (error) {
         this.logger.warn('Failed to refresh Pinterest token; revoking session', {
            sessionId: session.id,
            userId: session.userId,
            providerUserId: account.providerUserId,
            error,
         });

         await this.revokeSession(session.id);
         return false;
      }
   }

   private async revokeSession(sessionId: string) {
      await this.prismaService.authSession.update({
         where: { id: sessionId },
         data: { revokedAt: new Date() },
      });
   }

   private encrypt(rawValue: string) {
      const key = Buffer.from(this.appConfig.required('APP_ENCRYPTION_KEY'), 'hex');
      const iv = randomBytes(12);
      const cipher = createCipheriv('aes-256-gcm', key, iv);
      const encrypted = Buffer.concat([cipher.update(rawValue, 'utf8'), cipher.final()]);
      const authTag = cipher.getAuthTag();

      return `${iv.toString('hex')}.${authTag.toString('hex')}.${encrypted.toString('hex')}`;
   }

   private decrypt(payload: string) {
      const [ivHex, authTagHex, encryptedHex] = payload.split('.');
      const key = Buffer.from(this.appConfig.required('APP_ENCRYPTION_KEY'), 'hex');
      const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
      decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
      const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedHex, 'hex')), decipher.final()]);
      return decrypted.toString('utf8');
   }

}
