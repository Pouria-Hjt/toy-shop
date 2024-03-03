import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  await app.listen(port);
}
bootstrap();