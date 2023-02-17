import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateGameFields,
  JoinGameFields,
  RejoinGameFields,
} from './games.types';
import { createGameId } from '../ids';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { PlayersService } from '../players/players.service';

@Injectable()
export class GamesService {
  private logger = new Logger(GamesService.name);

  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,

    @Inject(PlayersService)
    private playersService: PlayersService,
  ) {}
  async createGame(fields: CreateGameFields) {
    const gameId = createGameId();

    const admin = await this.playersService.createPlayer(fields.playerName);

    const game = new Game();
    game.id = gameId;
    game.adminId = admin.id;

    // TODO: create accessToken based on game id + admin id

    this.logger.log(`Creating game. ${JSON.stringify(game)}}`);
    return await this.gamesRepository.save(game);
  }

  async joinGame(fields: JoinGameFields) {
    const game = await this.gamesRepository.findOne({
      where: { id: fields.gameId },
    });

    const player = await this.playersService.createPlayer(fields.playerName);

    console.log(game);
    console.log(game.playerIds);
    game.playerIds = game.playerIds
      ? [...game.playerIds, player.id]
      : [player.id];

    this.logger.log(`Adding player to game. ${JSON.stringify(game)}}`);
    return await this.gamesRepository.save(game);
  }

  async rejoinGame(fields: RejoinGameFields) {
    return fields;
  }
}
