import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true });
  app.use(cookieParser());
  await app.listen(5000);
}

bootstrap();
