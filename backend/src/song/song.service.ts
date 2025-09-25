import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { parse } from 'csv-parse/sync';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private repo: Repository<Song>,
  ) {}

  async importCsv(buffer: Buffer): Promise<number> {
    // tell parser to return an array of objects with string keys
    const records: Record<string, string>[] = parse(buffer.toString('utf8'), { 
      columns: true, 
      delimiter: ';' 
    });
    // ensure each upload replaces previous data
  await this.repo.clear();
    const songs = records.map((r) => {
      const song = new Song();
      song.title = r['Song Name']?.toLowerCase();
      song.band = r['Band']?.toLowerCase();
      song.year = r['Year']?.toLowerCase();
      return song;
    });

    await this.repo.save(songs);
    return songs.length;
  }

  async getAll() {
    return this.repo.find({ order: { band: 'ASC' } });
  }
}
