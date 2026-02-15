import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PinterestController } from './pinterest.controller';
import { PinterestService } from './pinterest.service';

@Module({
   imports: [AuthModule],
   controllers: [PinterestController],
   providers: [PinterestService],
})
export class PinterestModule {}
