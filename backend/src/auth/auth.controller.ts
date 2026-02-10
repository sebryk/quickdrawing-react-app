import { Controller, Get, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth/pinterest')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Get('url')
   async getAuthUrl() {
      const url = await this.authService.createPinterestAuthorizationUrl()
      return { url }
   }

   @Get('callback')
   async callback(
      @Query('code') code: string,
      @Query('state') state: string,
      @Res() response: Response,
   ) {
      await this.authService.handlePinterestCallback({ code, state, response })
   }
}
