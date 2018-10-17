import { Injectable } from '@nestjs/common';

@Injectable()
export class FileMetadataService {
  async uploadFile(upfile) {
    return {
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
    };
  }
}
