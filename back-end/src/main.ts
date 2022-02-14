import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Strategy} from 'passport-42';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
