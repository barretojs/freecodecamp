import { Injectable } from '@nestjs/common';
import * as dns from 'dns';
import { Response } from 'express';
import { SuccessInterface } from './interfaces/success.interface';
import { FailInterface } from './interfaces/fail.interface';
import { promisify } from 'util';

@Injectable()
export class UrlShortenerService {
  shortened: Array<string> = [];
  urlNumber: number = 0;

  constructor() {}

  onModuleInit() {
    this.shortened = [];
    this.urlNumber = 0;
  }

  async shortenUrl(url: string): Promise<SuccessInterface | FailInterface> {
    try {
      let urlStrip = url;

      if (url.startsWith('http://')) {
        urlStrip = url.replace('http://', '');
      } else if (url.startsWith('https://')) {
        urlStrip = url.replace('https://', '');
      } else {
        url = `http://${url}`;
      }

      const lookup = promisify(dns.lookup);

      await lookup(urlStrip);

      this.shortened.push(url);
      this.urlNumber++;

      return {
        original_url: url,
        short_url: this.urlNumber - 1,
      };
    } catch (error) {
      return {
        error: 'invalid URL',
      };
    }
  }

  async getUrl(shortUrl: string, res: Response): Promise<FailInterface | void> {
    const shortUrlNumber = parseInt(shortUrl, 10);

    if (isNaN(shortUrlNumber)) {
      return {
        error: 'invalid URL',
      };
    }

    return res.redirect(this.shortened[shortUrlNumber]);
  }
}
