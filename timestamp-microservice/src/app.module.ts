import { Module } from '@nestjs/common';
import { TimestampModule } from './timestamp/timestamp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TimestampModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
