import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { GamesService } from './games.service';

@WebSocketGateway({
  namespace: 'games',
})
export class GamesGateway implements OnGatewayInit {
  private logger = new Logger(GamesGateway.name);

  constructor(private readonly gamesService: GamesService) {}

  afterInit() {
    this.logger.log('Websocket Gateway initialized');
  }
}
