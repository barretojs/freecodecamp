import { Module } from '@nestjs/common';
import { FileMetadataController } from './file-metadata.controller';
import { FileMetadataService } from './file-metadata.service';

@Module({
  controllers: [FileMetadataController],
  providers: [FileMetadataService],
})
export class FileMetadataModule {}
