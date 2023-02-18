import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  private readonly logger = new Logger(ControllerAuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    this.logger.debug('Checking for auth tocken on request body', request.body);

    const { accessToken } = request.body;

    try {
      const payload = this.jwtService.verify(accessToken);
      request.gameId = payload.gameId;
      request.playerId = payload.playerId;
      request.displayName = payload.displayName;
      return true;
    } catch (e) {
      throw new ForbiddenException('Invalid access token');
    }
  }
}
