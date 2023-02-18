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

  async getPlayer(id: string) {
    return await this.playersRepository.findOneBy({ id });
  }

  async createPlayer(playerName: string, playerId?: string): Promise<Player> {
    const finalPlayerId = playerId ?? createPlayerId();

    const player = new Player();
    player.id = finalPlayerId;
    player.name = playerName;

    this.logger.log(`Creating player: ${JSON.stringify(player)}}`);
    return await this.playersRepository.save(player);
  }

  async deletePlayer(playerId: string) {
    return await this.playersRepository.delete(playerId);
  }
}
