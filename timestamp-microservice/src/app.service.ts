import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class AppService {
  constructor() {}

  async root(res) {
    return res.sendFile(resolve('views/index.html'));
  }
}
