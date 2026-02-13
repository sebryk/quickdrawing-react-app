import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type { PinterestTokenResponse, PinterestUserResponse } from '../types/pinterest.types';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class PinterestOAuthService {
   constructor(private readonly appConfig: AppConfigService) {}

   createAuthorizationUrl() {
      const authUrl = new URL(this.appConfig.required('PINTEREST_AUTH_URL'));

      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('client_id', this.appConfig.required('PINTEREST_CLIENT_ID'));
      authUrl.searchParams.set('redirect_uri', this.appConfig.required('PINTEREST_REDIRECT_URI'));
      authUrl.searchParams.set('scope', this.appConfig.required('PINTEREST_SCOPE'));

      return authUrl;
   }

   async exchangeCodeForToken(code: string) {
      const tokenUrl = this.appConfig.required('PINTEREST_TOKEN_URL');
      const body = new URLSearchParams({
         grant_type: 'authorization_code',
         code,
         redirect_uri: this.appConfig.required('PINTEREST_REDIRECT_URI'),
      });

      return this.requestTokens(tokenUrl, body);
   }

   async refreshToken(refreshToken: string) {
      const tokenUrl = this.appConfig.required('PINTEREST_TOKEN_URL');
      const body = new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
      });

      return this.requestTokens(tokenUrl, body);
   }

   async fetchProfile(accessToken: string) {
      const userUrl = this.appConfig.required('PINTEREST_USER_URL');
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

   private async requestTokens(tokenUrl: string, body: URLSearchParams) {
      const basicToken = Buffer.from(
         `${this.appConfig.required('PINTEREST_CLIENT_ID')}:${this.appConfig.required('PINTEREST_CLIENT_SECRET')}`,
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
}
