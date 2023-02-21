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

  async handleConnection(client: SocketWithAuth, ...args: any[]) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Client connected: playerId = ${client.playerId}, playerName= ${client.playerName}, gameId = ${client.gameId}`,
    );
    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`Number of connected sockets: ${sockets.size}`);

    const roomName = client.gameId;
    await client.join(roomName);

    const clientCount = this.io.adapter.rooms?.get(roomName)?.size ?? 0;

    this.logger.debug(
      `playerId: ${client.playerId} joining room: ${roomName} with ${clientCount} clients`,
    );

    const updatedGame = await this.gamesService.addPlayer({
      gameId: client.gameId,
      playerId: client.playerId,
      playerName: client.playerName,
    });

    this.io.to(roomName).emit('game_updated', updatedGame);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Client disconnected: playerId = ${client.playerId}, playerName= ${client.playerName}, gameId = ${client.gameId}`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`Number of disconnected sockets: ${sockets.size}`);

    const { gameId, playerId } = client;
    const roomName = gameId;
    const clientCount = this.io.adapter.rooms?.get(roomName)?.size ?? 0;
    this.logger.debug(
      `playerId: ${client.playerId} leaving room: ${roomName} with ${clientCount} clients`,
    );

    const updatedGame = await this.gamesService.removePlayer({
      gameId,
      playerId,
    });
    if (updatedGame) {
      this.io.to(roomName).emit('game_updated', updatedGame);
    }
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

    const updatedGame = await this.gamesService.removePlayer({
      gameId: client.gameId,
      playerId: id,
    });

    if (updatedGame) {
      this.io.to(client.gameId).emit('game_updated', updatedGame);
    }
  }
}
