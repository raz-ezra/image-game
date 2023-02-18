import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { PlayersModule } from '../players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { jwtModule } from '../modules.config';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PlayersModule, jwtModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [TypeOrmModule, GamesService],
})
export class GamesModule {}
