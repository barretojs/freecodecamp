import { Module } from '@nestjs/common';
import { RequestParserController } from './request-parser.controller';
import { RequestParserService } from './request-parser.service';

@Module({
  controllers: [RequestParserController],
  providers: [RequestParserService]
})
export class RequestParserModule {}
