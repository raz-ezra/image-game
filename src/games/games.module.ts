import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { PlayersModule } from '../players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PlayersModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [TypeOrmModule.forFeature([Game]), GamesService],
})
export class GamesModule {}
