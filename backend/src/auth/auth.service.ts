import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from 'crypto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

type CallbackPayload = {
   code: string;
   state: string;
   response: Response;
};

type SessionUser = {
   providerUserId: string;
};

type PinterestTokenResponse = {
   access_token: string;
   refresh_token?: string;
   token_type: string;
   scope?: string;
   expires_in?: number;
};

type PinterestUserResponse = {
   username?: string;
   account_type?: string;
   profile_image?: string;
};

@Injectable()
export class AuthService {
   constructor(
      private readonly configService: ConfigService,
      private readonly prismaService: PrismaService,
   ) {}

   async createPinterestAuthorizationUrl() {
      const state = randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await this.prismaService.oAuthState.create({
         data: {
            state,
            expiresAt,
         },
      });

      const authUrl = new URL(this.required('PINTEREST_AUTH_URL'));

      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('client_id', this.required('PINTEREST_CLIENT_ID'));
      authUrl.searchParams.set('redirect_uri', this.required('PINTEREST_REDIRECT_URI'));
      authUrl.searchParams.set('scope', this.required('PINTEREST_SCOPE'));
      authUrl.searchParams.set('state', state);

      return authUrl.toString();
   }

   async handlePinterestCallback({ code, state, response }: CallbackPayload) {
      if (!code || !state) {
         throw new BadRequestException('Missing OAuth code/state');
      }

      const storedState = await this.prismaService.oAuthState.findUnique({ where: { state } });
      if (!storedState || storedState.usedAt || storedState.expiresAt < new Date()) {
         throw new BadRequestException('Invalid OAuth state');
      }

      await this.prismaService.oAuthState.update({
         where: { state },
         data: { usedAt: new Date() },
      });

      const tokenPayload = await this.requestPinterestTokens(code);

      console.log(tokenPayload);
      const profile = await this.getPinterestProfile(tokenPayload.access_token);

      const providerUserId = profile.username || `pinterest_${randomUUID()}`;
      const expiresAt = tokenPayload.expires_in ? new Date(Date.now() + tokenPayload.expires_in * 1000) : null;

      const user = await this.prismaService.$transaction(async (tx) => {
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

      const sessionToken = randomBytes(48).toString('hex');
      const sessionTokenHash = this.hash(sessionToken);
      const sessionTtlDays = this.configService.get<number>('SESSION_TTL_DAYS', 14);
      const sessionExpiresAt = new Date(Date.now() + sessionTtlDays * 24 * 60 * 60 * 1000);

      await this.prismaService.authSession.create({
         data: {
            userId: user.id,
            tokenHash: sessionTokenHash,
            expiresAt: sessionExpiresAt,
         },
      });

      response.cookie(this.required('SESSION_COOKIE_NAME'), sessionToken, {
         httpOnly: true,
         secure: this.required('NODE_ENV') === 'production',
         sameSite: 'lax',
         expires: sessionExpiresAt,
      });

      const frontendBaseUrl = this.required('FRONTEND_URL').replace(/\/$/, '');
      const encodedUser = encodeURIComponent(providerUserId);
      response.redirect(`${frontendBaseUrl}/${encodedUser}`);
   }

   async getPinterestUserFromSession(sessionToken?: string): Promise<SessionUser | null> {
      if (!sessionToken) {
         return null;
      }

      const tokenHash = this.hash(sessionToken);
      const session = await this.prismaService.authSession.findUnique({
         where: { tokenHash },
         include: {
            user: {
               include: {
                  oauthAccounts: true,
               },
            },
         },
      });

      if (!session || session.revokedAt || session.expiresAt < new Date()) {
         return null;
      }

      const pinterestAccount = session.user.oauthAccounts.find((account) => account.provider === 'pinterest');
      if (!pinterestAccount) {
         return null;
      }

      return { providerUserId: pinterestAccount.providerUserId };
   }

   getSessionCookieName() {
      return this.required('SESSION_COOKIE_NAME');
   }

   private async requestPinterestTokens(code: string) {
      const tokenUrl = this.required('PINTEREST_TOKEN_URL');
      const body = new URLSearchParams({
         grant_type: 'authorization_code',
         code,
         redirect_uri: this.required('PINTEREST_REDIRECT_URI'),
      });

      const basicToken = Buffer.from(
         `${this.required('PINTEREST_CLIENT_ID')}:${this.required('PINTEREST_CLIENT_SECRET')}`,
      ).toString('base64');

      const tokenResponse = await fetch(tokenUrl, {
         method: 'POST',
         headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body,
      });

      if (!tokenResponse.ok) {
         throw new InternalServerErrorException('Failed to exchange Pinterest code to token');
      }

      return (await tokenResponse.json()) as PinterestTokenResponse;
   }

   private async getPinterestProfile(accessToken: string) {
      const userUrl = this.required('PINTEREST_USER_URL');
      const profileResponse = await fetch(userUrl, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });

      if (!profileResponse.ok) {
         throw new InternalServerErrorException('Failed to fetch Pinterest profile');
      }

      return (await profileResponse.json()) as PinterestUserResponse;
   }

   private encrypt(rawValue: string) {
      const key = Buffer.from(this.required('APP_ENCRYPTION_KEY'), 'hex');
      const iv = randomBytes(12);
      const cipher = createCipheriv('aes-256-gcm', key, iv);
      const encrypted = Buffer.concat([cipher.update(rawValue, 'utf8'), cipher.final()]);
      const authTag = cipher.getAuthTag();

      return `${iv.toString('hex')}.${authTag.toString('hex')}.${encrypted.toString('hex')}`;
   }

   private decrypt(payload: string) {
      const [ivHex, authTagHex, encryptedHex] = payload.split('.');
      const key = Buffer.from(this.required('APP_ENCRYPTION_KEY'), 'hex');
      const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
      decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
      const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedHex, 'hex')), decipher.final()]);
      return decrypted.toString('utf8');
   }

   private hash(value: string) {
      return createHash('sha256').update(value).digest('hex');
   }

   private required(key: string) {
      const value = this.configService.get<string>(key);
      if (!value) {
         throw new InternalServerErrorException(`Missing required env variable: ${key}`);
      }

      return value;
   }
}
