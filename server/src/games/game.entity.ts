import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class Game {
  @PrimaryColumn()
  id: string;

  @Column()
  adminId: string;

  @Column('text', { array: true })
  playerIds: string[];

  @Column()
  hasStarted: boolean;

  @Column()
  hasEnded: boolean;
}
