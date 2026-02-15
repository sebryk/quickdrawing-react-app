import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionService } from './services/auth-session.service';
import { OAuthAccountService } from './services/oauth-account.service';
import { PinterestOAuthService } from './services/pinterest-oauth.service';
import { AppConfigService } from '../config/app-config.service';
import { PinterestAuthGuard } from './guards/pinterest-auth.guard';

@Module({
   controllers: [AuthController],
   providers: [
      AppConfigService,
      AuthService,
      AuthSessionService,
      OAuthAccountService,
      PinterestOAuthService,
      PinterestAuthGuard,
   ],
   exports: [AuthService, PinterestOAuthService, PinterestAuthGuard],
})
export class AuthModule {}
