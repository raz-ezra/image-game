import { Entity, ManyToMany, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Player } from '../players/player.entity';

@Entity()
@Unique(['id'])
export class Game {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Player, (player) => player.id)
  adminId: string;

  @ManyToMany(() => Player, (player) => player.id)
  playerIds: string[];
}
