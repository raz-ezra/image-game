import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { SocketWithAuth } from './games/games.types';

export class SocketIoAdapter extends IoAdapter {
  private logger = new Logger(SocketIoAdapter.name);

  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = parseInt(this.configService.get('CLIENT_PORT'));

    const cors = {
      origin: [
        `http://localhost:${clientPort}`,
        new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
      ],
    };

    this.logger.log('Configuring SocketIo server with custom cors options', {
      cors,
    });

    const optionsWithCors: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);

    const server: Server = super.createIOServer(port, optionsWithCors);

    server.of('games').use(createTokenMiddleware(jwtService, this.logger));

    return server;
  }
}

const createTokenMiddleware =
  (jwtService: JwtService, logger: Logger) =>
  (socket: SocketWithAuth, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;

    logger.debug('Checking for auth token on socket', token);

    try {
      const payload = jwtService.verify(token);
      socket.gameId = payload.gameId;
      socket.playerId = payload.playerId;
      socket.displayName = payload.displayName;
      logger.log('Valid access token in WS', { payload });
      next();
    } catch {
      next(new Error('Invalid access token'));
    }
  };
