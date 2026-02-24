import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PinterestOAuthService } from '../auth/services/pinterest-oauth.service';
import type { PinterestBoardResponse, PinterestPinResponse } from '../auth/types/pinterest.types';

type ListPinterestOptions = {
   accessToken?: string;
   pageSize?: number;
   bookmark?: string;
};

type AppBoard = {
   id: string;
   name: string | null;
   description: string | null;
   privacy: string | null;
   createdAt: string | null;
   imageUrl: string | null;
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
      private readonly pinterestOAuthService: PinterestOAuthService,
   ) {}

   async listBoards({ accessToken, pageSize, bookmark }: ListPinterestOptions) {
      if (!accessToken) {
         throw new UnauthorizedException();
      }

      const payload = await this.pinterestOAuthService.fetchBoards(accessToken, pageSize, bookmark);
      const items = (payload.items ?? []).map((board) => this.normalizeBoard(board));

      return {
         items,
         bookmark: payload.bookmark ?? null,
      };
   }

   async getBoardById(boardId: string, accessToken?: string) {
      if (!accessToken) {
         throw new UnauthorizedException();
      }

      const board = await this.pinterestOAuthService.fetchBoardById(accessToken, boardId);
      return this.normalizeBoard(board);
   }

   async listPins({ accessToken, pageSize, bookmark }: ListPinterestOptions) {
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

   async getPinById(pinId: string, accessToken?: string) {
      if (!accessToken) {
         throw new UnauthorizedException();
      }

      const pin = await this.pinterestOAuthService.fetchPinById(accessToken, pinId);
      return this.normalizePin(pin);
   }


   private normalizeBoard(board: PinterestBoardResponse): AppBoard {
      return {
         id: board.id,
         name: board.name ?? null,
         description: board.description ?? null,
         privacy: board.privacy ?? null,
         createdAt: board.created_at ?? null,
         imageUrl: this.pickBoardImageUrl(board),
      };
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

   private pickBoardImageUrl(board: PinterestBoardResponse) {
      const rawMedia = board.media;
      if (!rawMedia || typeof rawMedia !== 'object') {
         return null;
      }

      const media = rawMedia as {
         image_cover_url?: string;
         cover_image_url?: string;
         image_cover?: string;
      };

      return media.image_cover_url ?? media.cover_image_url ?? media.image_cover ?? null;
   }
}
