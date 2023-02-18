import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGameFields, JoinGameFields } from './games.types';
import { createGameId } from '../ids';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { PlayersService } from '../players/players.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GamesService {
  private logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,

    @Inject(PlayersService)
    private playersService: PlayersService,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async getAllGames() {
    return await this.gamesRepository.find();
  }

  async getGame(id: string) {
    return await this.gamesRepository.findOneBy({ id });
  }

  async createGame(fields: CreateGameFields) {
    const gameId = createGameId();

    const admin = await this.playersService.createPlayer(fields.playerName);

    const game = new Game();
    game.id = gameId;
    game.adminId = admin.id;
    game.playerIds = [admin.id];
    game.hasStarted = false;
    game.hasEnded = false;

    this.logger.log(`Creating game. ${JSON.stringify(game)}}`);
    const createdGame = await this.gamesRepository.save(game);

    this.logger.log(
      `Creating token. gameId = ${gameId}, subject = ${admin.id}`,
    );
    const signedToken = this.jwtService.sign(
      { gameId, playerId: admin.id, displayName: admin.displayName },
      { subject: admin.id },
    );

    return {
      game: createdGame,
      accessToken: signedToken,
    };
  }

  async joinGame(fields: JoinGameFields) {
    const game = await this.getGame(fields.gameId);

    const player = await this.playersService.createPlayer(fields.playerName);

    game.playerIds = [...game.playerIds, player.id];

    this.logger.log(`Adding player to game. ${JSON.stringify(game)}}`);
    const updatedGame = await this.gamesRepository.save(game);

    this.logger.log(
      `Creating token. gameId = ${updatedGame.id}, subject = ${player.id}`,
    );
    const signedToken = this.jwtService.sign(
      {
        gameId: updatedGame.id,
        playerId: player.id,
        displayName: player.displayName,
      },
      { subject: player.id },
    );

    return {
      game: updatedGame,
      accessToken: signedToken,
    };
  }

  async removePlayer(gameId: string, playerId: string) {
    const game = await this.getGame(gameId);

    const { playerIds } = game;
    const playerIndex = playerIds.indexOf(playerId);
    if (playerIndex === -1) {
      this.logger.error(`Player ${playerId} not found in game`);
      throw new NotFoundException(`Player ${playerId} not found in game`);
    }
    const newPlayerIds = [
      ...playerIds.slice(0, playerIndex),
      ...playerIds.slice(playerIndex + 1),
    ];
    game.playerIds = newPlayerIds;
    this.logger.log(
      `Updating game ${game.id} with new playerIds`,
      newPlayerIds,
    );
    return await this.gamesRepository.save(game);
  }
}
