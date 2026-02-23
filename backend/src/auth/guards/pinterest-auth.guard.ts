import {
   CanActivate,
   ExecutionContext,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth.service';

export type RequestWithPinterest = Request & {
   pinterestAccessToken?: string;
};

@Injectable()
export class PinterestAuthGuard implements CanActivate {
   constructor(private readonly authService: AuthService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<RequestWithPinterest>();
      const cookieName = this.authService.getSessionCookieName();
      const sessionToken = request.cookies?.[cookieName];
      const accessToken = await this.authService.getPinterestAccessTokenFromSession(sessionToken);

      if (!accessToken) {
         throw new UnauthorizedException();
      }

      request.pinterestAccessToken = accessToken;
      return true;
   }
}
