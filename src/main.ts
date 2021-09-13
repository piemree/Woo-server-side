import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new IoAdapter(app)); */
  app.enableCors({ origin: '*' });
  await app.listen(5000);
}
bootstrap();
