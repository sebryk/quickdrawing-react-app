import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
   constructor(private readonly configService: ConfigService) {}

   required(key: string) {
      const value = this.configService.get<string>(key);
      if (!value) {
         throw new InternalServerErrorException(`Missing required env variable: ${key}`);
      }

      return value;
   }

   getNumber(key: string, defaultValue?: number) {
      const value = this.configService.get<number>(key);
      if (value === undefined) {
         if (defaultValue === undefined) {
            throw new InternalServerErrorException(`Missing required env variable: ${key}`);
         }

         return defaultValue;
      }

      return value;
   }

   getString(key: string, defaultValue?: string) {
      const value = this.configService.get<string>(key);
      if (value === undefined || value === null || value === '') {
         if (defaultValue === undefined) {
            throw new InternalServerErrorException(`Missing required env variable: ${key}`);
         }

         return defaultValue;
      }

      return value;
   }
}
