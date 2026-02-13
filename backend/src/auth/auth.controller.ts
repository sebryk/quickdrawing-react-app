import { Controller, Get, Query, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth/pinterest')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Get('url')
   async getAuthUrl() {
      const url = await this.authService.createPinterestAuthorizationUrl();
      return { url };
   }

   @Get('callback')
   async callback(@Query('code') code: string, @Query('state') state: string, @Res() response: Response) {
      await this.authService.handlePinterestCallback({ code, state, response });
   }

   @Get('me')
   async me(@Req() request: Request) {
      const cookieName = this.authService.getSessionCookieName();
      const sessionToken = request.cookies?.[cookieName];
      const sessionUser = await this.authService.getPinterestUserFromSession(sessionToken);
      if (!sessionUser) {
         throw new UnauthorizedException();
      }

      return {
         user: sessionUser.username ?? sessionUser.providerUserId,
         profileImageUrl: sessionUser.profileImageUrl,
      };
   }
}
