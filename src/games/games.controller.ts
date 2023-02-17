import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameDto, JoinGameDto, RejoinGameDto } from './games.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('/create')
  async create(@Body() createGameDto: CreateGameDto) {
    const result = await this.gamesService.createGame(createGameDto);

    return result;
  }

  @Post('/join')
  async join(@Body() joinGameDto: JoinGameDto) {
    const result = await this.gamesService.joinGame(joinGameDto);

    return result;
  }

  @Post('/rejoin')
  async rejoin(@Body() joinGameDto: RejoinGameDto) {
    const result = await this.gamesService.rejoinGame(joinGameDto);
  }
}
