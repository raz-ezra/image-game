import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGameDto, JoinGameDto } from './games.dto';
import { GamesService } from './games.service';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './games.types';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllGames() {
    const result = await this.gamesService.getAllGames();

    return result;
  }

  @Get('/:id')
  async getGameById(@Param('id') id: string) {
    const result = await this.gamesService.getGame(id);

    return result;
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
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
  @UseGuards(ControllerAuthGuard)
  async rejoin(@Req() request: RequestWithAuth) {
    return await this.gamesService.getGame(request.gameId);
  }
}
