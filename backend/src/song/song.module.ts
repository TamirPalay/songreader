import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}
