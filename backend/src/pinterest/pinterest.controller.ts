import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PinterestAccessToken } from '../auth/decorators/pinterest-access-token.decorator';
import { PinterestAuthGuard } from '../auth/guards/pinterest-auth.guard';
import { PinterestService } from './pinterest.service';

@Controller('pinterest')
@UseGuards(PinterestAuthGuard)
export class PinterestController {
   constructor(private readonly pinterestService: PinterestService) {}

   @Get('pins')
   async listPins(
      @PinterestAccessToken() accessToken: string,
      @Query('page_size') pageSizeRaw?: string,
      @Query('bookmark') bookmark?: string,
   ) {
      const pageSize = pageSizeRaw ? Number.parseInt(pageSizeRaw, 10) : undefined;
      const normalizedPageSize = pageSize && pageSize > 0 ? Math.min(250, pageSize) : undefined;

      return this.pinterestService.listPins({
         accessToken,
         pageSize: normalizedPageSize,
         bookmark,
      });
   }

   @Get('pins/:pinId')
   async getPin(@PinterestAccessToken() accessToken: string, @Param('pinId') pinId: string) {
      return this.pinterestService.getPinById(pinId, accessToken);
   }
}
