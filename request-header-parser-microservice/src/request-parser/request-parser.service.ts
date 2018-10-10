import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SuccessInterface } from './interfaces/success.interface';

@Injectable()
export class RequestParserService {
  constructor() {}

  async parseHeader(req: Request): Promise<SuccessInterface> {
    return {
      ipaddress: req.ip,
      language: req.get('Accept-Language'),
      software: req.get('User-Agent'),
    };
  }
}
