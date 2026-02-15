import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthSessionService } from './services/auth-session.service'
import { OAuthAccountService } from './services/oauth-account.service'
import { PinterestOAuthService } from './services/pinterest-oauth.service'
import { AppConfigService } from '../config/app-config.service'

@Module({
   controllers: [AuthController],
   providers: [AppConfigService, AuthService, AuthSessionService, OAuthAccountService, PinterestOAuthService],
   exports: [AuthService, PinterestOAuthService],
})
export class AuthModule {}
