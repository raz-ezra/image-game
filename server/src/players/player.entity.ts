import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class Player {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
