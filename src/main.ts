import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //app.use(helmet());
  app.enableCors({credentials: true, origin: '*'});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
