import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { Response } from 'express';

@Injectable()
export class AppService {
  async root(res: Response) {
    return res.sendFile(resolve('views/index.html'));
  }
}
