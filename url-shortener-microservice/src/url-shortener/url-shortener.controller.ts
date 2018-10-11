import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';
import { SuccessInterface } from './interfaces/success.interface';
import { FailInterface } from './interfaces/fail.interface';

@Controller('api/shorturl')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('new')
  async shortenUrl(
    @Body('url') url: string,
  ): Promise<SuccessInterface | FailInterface> {
    return await this.urlShortenerService.shortenUrl(url);
  }

  @Get(':number')
  async getUrl(
    @Param('number') shortUrl: string,
    @Res() res: Response,
  ): Promise<FailInterface | void> {
    return await this.urlShortenerService.getUrl(shortUrl, res);
  }
}
