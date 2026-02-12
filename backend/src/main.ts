import cookieParser = require('cookie-parser')
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   const configService = app.get(ConfigService)

   app.use(cookieParser())
   app.enableCors({
      origin: configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
      credentials: true,
   })
   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

   const port = configService.get<number>('PORT', 4000)
   await app.listen(port)
}

void bootstrap()
