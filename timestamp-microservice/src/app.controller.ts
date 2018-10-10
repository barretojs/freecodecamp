import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async root(@Res() res) {
    return await this.appService.root(res);
  }
}
