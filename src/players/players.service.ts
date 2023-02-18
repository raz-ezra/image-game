import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { createPlayerId } from '../ids';

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name);
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    return await this.playersRepository.find();
  }

  async createPlayer(playerName: string): Promise<Player> {
    const playerId = createPlayerId();

    const player = new Player();
    player.id = playerId;
    player.displayName = playerName;

    this.logger.log(`Creating player: ${JSON.stringify(player)}}`);
    return await this.playersRepository.save(player);
  }
}
