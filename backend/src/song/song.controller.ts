import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongService } from './song.service';
import type { Express } from 'express';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadCsv(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    return { message: 'No file uploaded' };
  }
  const count = await this.songService.importCsv(file.buffer);
  return { message: `Imported ${count} songs` };
}

  @Get()
  async getAll() {
    return this.songService.getAll();
  }
}
