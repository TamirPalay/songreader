import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { Song } from './song/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'songsdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Song]),   // ✅ add this
    SongModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
  ) {}

  async onModuleInit() {
    await this.songRepo.clear();
    console.log('✅ Songs table cleared on startup');
  }
}
