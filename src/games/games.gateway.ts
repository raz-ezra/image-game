import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from './games.types';
import { WsCatchAllFilter } from '../exceptions/ws-catch-all-filter';
import { GatewayAdminGuard } from './gateway-admin-guard';

@WebSocketGateway({
  namespace: 'games',
})
@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
export class GamesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(GamesGateway.name);

  constructor(private readonly gamesService: GamesService) {}

  @WebSocketServer() io: Namespace;

  afterInit() {
    this.logger.log('Websocket Gateway initialized');
  }

  handleConnection(client: SocketWithAuth, ...args: any[]): any {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Client connected: playerId = ${client.playerId}, displayName= ${client.displayName}, gameId = ${client.gameId}`,
    );
    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
  }

  handleDisconnect(client: SocketWithAuth): any {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Client disconnected: playerId = ${client.playerId}, displayName= ${client.displayName}, gameId = ${client.gameId}`,
    );
    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`Number of disconnected sockets: ${sockets.size}`);

    // TODO: remove client from DB and send participants-update event
  }

  @SubscribeMessage('remove_player')
  @UseGuards(GatewayAdminGuard)
  async removePlayer(
    @MessageBody('id') id: string,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    this.logger.debug(
      `Attempting to remove player ${id} from game ${client.gameId}`,
    );

    const updatedGame = await this.gamesService.removePlayer(client.gameId, id);

    if (updatedGame) {
      this.io.to(client.gameId).emit('game_updated', updatedGame);
    }
  }
}
