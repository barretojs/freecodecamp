import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileMetadataService } from './file-metadata.service';
import { FileMetadataInterceptor } from './file-metadata.interceptor';

@Controller('api/fileanalyse')
export class FileMetadataController {
  constructor(private fileMetadataService: FileMetadataService) {}

  @Post()
  @UseInterceptors(FileMetadataInterceptor)
  async uploadFile(@UploadedFile() upfile) {
    return this.fileMetadataService.uploadFile(upfile);
  }
}
