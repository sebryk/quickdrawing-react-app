import { BadRequestException, Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSessionService } from './services/auth-session.service';
import { OAuthAccountService } from './services/oauth-account.service';
import { PinterestOAuthService } from './services/pinterest-oauth.service';
import { AppConfigService } from '../config/app-config.service';

type CallbackPayload = {
   code: string;
   state: string;
   response: Response;
};

type SessionUser = {
   providerUserId: string;
   username: string | null;
};

@Injectable()
export class AuthService {
   constructor(
      private readonly appConfig: AppConfigService,
      private readonly prismaService: PrismaService,
      private readonly authSessionService: AuthSessionService,
      private readonly oauthAccountService: OAuthAccountService,
      private readonly pinterestOAuthService: PinterestOAuthService,
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

      const authUrl = this.pinterestOAuthService.createAuthorizationUrl();
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

      const tokenPayload = await this.pinterestOAuthService.exchangeCodeForToken(code);
      const profile = await this.pinterestOAuthService.fetchProfile(tokenPayload.access_token);

      const providerUserId = profile.id || `pinterest_${randomUUID()}`;
      const providerUsername = profile.username ?? null;
      const user = await this.oauthAccountService.upsertPinterestUser(
         providerUserId,
         providerUsername,
         tokenPayload,
      );
      const { sessionToken, sessionExpiresAt } = await this.authSessionService.createSession(user.id);

      response.cookie(this.authSessionService.getCookieName(), sessionToken, {
         httpOnly: true,
         secure: this.appConfig.required('NODE_ENV') === 'production',
         sameSite: 'lax',
         expires: sessionExpiresAt,
      });

      const frontendBaseUrl = this.appConfig.required('FRONTEND_URL').replace(/\/$/, '');
      const encodedUser = encodeURIComponent(providerUsername ?? providerUserId);
      response.redirect(`${frontendBaseUrl}/${encodedUser}`);
   }

   async getPinterestUserFromSession(sessionToken?: string): Promise<SessionUser | null> {
      if (!sessionToken) {
         return null;
      }

      const session = await this.authSessionService.getSessionByToken(sessionToken);
      if (!session || session.revokedAt || session.expiresAt < new Date()) {
         return null;
      }

      const pinterestAccount = session.user.oauthAccounts.find((account) => account.provider === 'pinterest');
      if (!pinterestAccount) {
         return null;
      }

      const refreshed = await this.oauthAccountService.refreshPinterestIfNeeded(
         {
            id: pinterestAccount.id,
            providerUserId: pinterestAccount.providerUserId,
            refreshTokenEncrypted: pinterestAccount.refreshTokenEncrypted,
            expiresAt: pinterestAccount.expiresAt,
         },
         { id: session.id, userId: session.userId },
      );

      if (!refreshed) {
         return null;
      }

      return {
         providerUserId: pinterestAccount.providerUserId,
         username: pinterestAccount.providerUsername ?? null,
      };
   }

   getSessionCookieName() {
      return this.authSessionService.getCookieName();
   }
}
