import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PinterestOAuthService } from '../auth/services/pinterest-oauth.service';
import type { PinterestPinResponse } from '../auth/types/pinterest.types';

type ListPinsOptions = {
   sessionToken?: string;
   pageSize?: number;
   bookmark?: string;
};

type AppPin = {
   id: string;
   title: string | null;
   description: string | null;
   link: string | null;
   createdAt: string | null;
   imageUrl: string | null;
};

@Injectable()
export class PinterestService {
   constructor(
      private readonly authService: AuthService,
      private readonly pinterestOAuthService: PinterestOAuthService,
   ) {}

   async listPins({ sessionToken, pageSize, bookmark }: ListPinsOptions) {
      const accessToken = await this.authService.getPinterestAccessTokenFromSession(sessionToken);
      if (!accessToken) {
         throw new UnauthorizedException();
      }

      const payload = await this.pinterestOAuthService.fetchPins(accessToken, pageSize, bookmark);
      const items = (payload.items ?? []).map((pin) => this.normalizePin(pin));

      return {
         items,
         bookmark: payload.bookmark ?? null,
      };
   }

   async getPinById(pinId: string, sessionToken?: string) {
      const accessToken = await this.authService.getPinterestAccessTokenFromSession(sessionToken);
      if (!accessToken) {
         throw new UnauthorizedException();
      }

      const pin = await this.pinterestOAuthService.fetchPinById(accessToken, pinId);
      return this.normalizePin(pin);
   }

   private normalizePin(pin: PinterestPinResponse): AppPin {
      const imageUrl = this.pickImageUrl(pin);

      return {
         id: pin.id,
         title: pin.title ?? null,
         description: pin.description ?? null,
         link: pin.link ?? null,
         createdAt: pin.created_at ?? null,
         imageUrl,
      };
   }

   private pickImageUrl(pin: PinterestPinResponse) {
      const variants = pin.media?.images ? Object.values(pin.media.images) : [];
      const variantsWithSize = variants
         .filter((item) => Boolean(item.url))
         .sort((a, b) => (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0));

      return variantsWithSize[0]?.url ?? null;
   }
}
