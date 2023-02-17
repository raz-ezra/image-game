import { Controller, Get } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayersService } from './players.service';

@Controller('users')
export class PlayersController {
  constructor(private readonly usersService: PlayersService) {}

  @Get()
  async getAllUsers(): Promise<Player[]> {
    return await this.usersService.getAllPlayers();
  }
}
