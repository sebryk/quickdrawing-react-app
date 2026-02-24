import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type {
   PinterestBoardResponse,
   PinterestBoardsListResponse,
   PinterestPinResponse,
   PinterestPinsListResponse,
   PinterestTokenResponse,
   PinterestUserResponse,
} from '../types/pinterest.types';
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


   async fetchBoards(accessToken: string, pageSize?: number, bookmark?: string) {
      const boardsUrl = this.resolvePinterestApiUrl('/boards');
      if (pageSize !== undefined) {
         boardsUrl.searchParams.set('page_size', String(pageSize));
      }

      if (bookmark) {
         boardsUrl.searchParams.set('bookmark', bookmark);
      }

      const response = await fetch(boardsUrl.toString(), {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });

      if (!response.ok) {
         throw new InternalServerErrorException('Failed to fetch Pinterest boards');
      }

      return (await response.json()) as PinterestBoardsListResponse;
   }

   async fetchBoardById(accessToken: string, boardId: string) {
      const boardUrl = this.resolvePinterestApiUrl(`/boards/${boardId}`);
      const response = await fetch(boardUrl.toString(), {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });

      if (!response.ok) {
         throw new InternalServerErrorException('Failed to fetch Pinterest board');
      }

      return (await response.json()) as PinterestBoardResponse;
   }

   async fetchPins(accessToken: string, pageSize?: number, bookmark?: string) {
      const pinsUrl = this.resolvePinterestApiUrl('/pins');
      if (pageSize !== undefined) {
         pinsUrl.searchParams.set('page_size', String(pageSize));
      }

      if (bookmark) {
         pinsUrl.searchParams.set('bookmark', bookmark);
      }

      const response = await fetch(pinsUrl.toString(), {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });

      if (!response.ok) {
         throw new InternalServerErrorException('Failed to fetch Pinterest pins');
      }

      return (await response.json()) as PinterestPinsListResponse;
   }

   async fetchPinById(accessToken: string, pinId: string) {
      const pinUrl = this.resolvePinterestApiUrl(`/pins/${pinId}`);
      const response = await fetch(pinUrl.toString(), {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });

      if (!response.ok) {
         throw new InternalServerErrorException('Failed to fetch Pinterest pin');
      }

      return (await response.json()) as PinterestPinResponse;
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

   private resolvePinterestApiUrl(pathname: string) {
      const apiBaseUrl = this.appConfig.getString('PINTEREST_API_BASE_URL', 'https://api.pinterest.com/v5');
      const normalizedApiBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
      return new URL(`${normalizedApiBaseUrl}${pathname}`);
   }
}
