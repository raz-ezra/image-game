import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './socket-io-adatper';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  const port = parseInt(configService.get('PORT'));

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  app.setGlobalPrefix('api');
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
