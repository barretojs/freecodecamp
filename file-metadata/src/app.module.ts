import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileMetadataModule } from './file-metadata/file-metadata.module';

@Module({
  imports: [FileMetadataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
