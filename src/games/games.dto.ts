import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  readonly playerName: string;
}

export class JoinGameDto {
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;

  @IsString()
  @IsNotEmpty()
  readonly playerName: string;
}

export class RejoinGameDto {}
