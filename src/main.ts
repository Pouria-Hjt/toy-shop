import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { redisConfig } from './config/redis.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: redisConfig.host,
        port: parseInt(redisConfig.port)
      },
    },
  );
  await app.startAllMicroservices();
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
}

bootstrap();