import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async root(@Res() res: Response) {
    return await this.appService.root(res);
  }
}
