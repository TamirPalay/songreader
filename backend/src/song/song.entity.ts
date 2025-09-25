import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('songs')
@Unique(['band', 'title', 'year']) //ensures uniqueness in the db
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
//getting all of the columns by name and type. There are only three columns and an auto generated id
  @Column()
  band: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  year?: string;
}
