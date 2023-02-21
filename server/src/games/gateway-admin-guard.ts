import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, SocketWithAuth } from './games.types';
import { WsUnauthorizedException } from '../exceptions/ws-exceptions';

@Injectable()
export class GatewayAdminGuard implements CanActivate {
  private readonly logger = new Logger(GatewayAdminGuard.name);

  constructor(
    private readonly gamesService: GamesService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: SocketWithAuth = context.switchToWs().getClient();

    const token = socket.handshake.auth.token || socket.handshake.headers.token;

    if (!token) {
      this.logger.error('No authorization token provided');
      throw new WsUnauthorizedException('No authorization token provided');
    }

    try {
      const payload = this.jwtService.verify<AuthPayload & { sub: string }>(
        token,
      );

      this.logger.debug(`Validating admin using token payload`, payload);

      const { sub, gameId } = payload;

      const game = await this.gamesService.getGame(gameId);

      if (sub !== game.adminId) {
        throw new WsUnauthorizedException(
          'Not authorized with admin privileges',
        );
      }

      return true;
    } catch {
      throw new WsUnauthorizedException('Invalid authorization token');
    }
  }
}
