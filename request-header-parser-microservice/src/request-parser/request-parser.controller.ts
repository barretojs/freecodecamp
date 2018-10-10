import { Controller, Get, Req } from '@nestjs/common';
import { RequestParserService } from './request-parser.service';
import { Request } from 'express';
import { SuccessInterface } from './interfaces/success.interface';

@Controller('api/whoami')
export class RequestParserController {
  constructor(private readonly requestParserService: RequestParserService) {}

  @Get()
  async parseHeader(@Req() req: Request): Promise<SuccessInterface> {
    return await this.requestParserService.parseHeader(req);
  }
}
