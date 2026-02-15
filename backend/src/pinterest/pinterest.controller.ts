import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { PinterestService } from './pinterest.service';

@Controller('pinterest')
export class PinterestController {
   constructor(
      private readonly authService: AuthService,
      private readonly pinterestService: PinterestService,
   ) {}

   @Get('pins')
   async listPins(
      @Req() request: Request,
      @Query('page_size') pageSizeRaw?: string,
      @Query('bookmark') bookmark?: string,
   ) {
      const cookieName = this.authService.getSessionCookieName();
      const sessionToken = request.cookies?.[cookieName];
      const pageSize = pageSizeRaw ? Number.parseInt(pageSizeRaw, 10) : undefined;
      const normalizedPageSize = pageSize && pageSize > 0
         ? Math.min(250, pageSize)
         : undefined;

      return this.pinterestService.listPins({
         sessionToken,
         pageSize: normalizedPageSize,
         bookmark,
      });
   }

   @Get('pins/:pinId')
   async getPin(@Req() request: Request, @Param('pinId') pinId: string) {
      const cookieName = this.authService.getSessionCookieName();
      const sessionToken = request.cookies?.[cookieName];
      return this.pinterestService.getPinById(pinId, sessionToken);
   }
}
