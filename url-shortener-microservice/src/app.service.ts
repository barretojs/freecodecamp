import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from 'path';

@Injectable()
export class AppService {
  async root(res: Response): Promise<void> {
    return res.sendFile(resolve('views/index.html'));
  }
}
