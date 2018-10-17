import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async root(@Res() res: Response): Promise<void> {
    return this.appService.root(res);
  }
}
