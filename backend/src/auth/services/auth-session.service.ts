import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class AuthSessionService {
   private readonly logger = new Logger(AuthSessionService.name);

   constructor(
      private readonly appConfig: AppConfigService,
      private readonly prismaService: PrismaService,
   ) {}

   async createSession(userId: string) {
      const sessionToken = randomBytes(48).toString('hex');
      const sessionTokenHash = this.hash(sessionToken);
      const sessionTtlDays = this.appConfig.getNumber('SESSION_TTL_DAYS', 14);
      const sessionExpiresAt = new Date(Date.now() + sessionTtlDays * 24 * 60 * 60 * 1000);

      await this.prismaService.authSession.create({
         data: {
            userId,
            tokenHash: sessionTokenHash,
            expiresAt: sessionExpiresAt,
         },
      });

      return { sessionToken, sessionExpiresAt };
   }

   async getSessionByToken(sessionToken: string) {
      const tokenHash = this.hash(sessionToken);
      return this.prismaService.authSession.findUnique({
         where: { tokenHash },
         include: {
            user: {
               include: {
                  oauthAccounts: true,
               },
            },
         },
      });
   }

   async revokeSession(sessionId: string) {
      return this.prismaService.authSession.update({
         where: { id: sessionId },
         data: { revokedAt: new Date() },
      });
   }

   @Cron(CronExpression.EVERY_DAY_AT_3AM)
   async cleanupExpiredSessions() {
      const now = new Date();
      const result = await this.prismaService.authSession.deleteMany({
         where: {
            OR: [{ expiresAt: { lt: now } }, { revokedAt: { not: null } }],
         },
      });

      if (result.count > 0) {
         this.logger.log(`Cleaned up ${result.count} expired/revoked sessions`);
      }
   }

   getCookieName() {
      return this.appConfig.required('SESSION_COOKIE_NAME');
   }

   private hash(value: string) {
      return createHash('sha256').update(value).digest('hex');
   }
}
