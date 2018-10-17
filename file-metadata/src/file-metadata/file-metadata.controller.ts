import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { FileMetadataService } from './file-metadata.service';

@Controller('api/fileanalyse')
export class FileMetadataController {
  constructor(private fileMetadataService: FileMetadataService) {}

  @Post()
  @UseInterceptors(FileInterceptor('upfile'))
  async uploadFile(@UploadedFile() upfile) {
    return this.fileMetadataService.uploadFile(upfile);
  }
}
