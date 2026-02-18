import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestWithPinterest } from '../guards/pinterest-auth.guard';

export const PinterestAccessToken = createParamDecorator(
   (_data: unknown, ctx: ExecutionContext): string => {
      const request = ctx.switchToHttp().getRequest<RequestWithPinterest>();
      return request.pinterestAccessToken ?? '';
   },
);
