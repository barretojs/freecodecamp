import { Injectable } from '@nestjs/common';
import { FailInterface } from './interfaces/fail.interface';
import { SuccessInterface } from './interfaces/success.interface';

@Injectable()
export class TimestampService {
  constructor() {}

  async getTimestamp(date?: string): Promise<FailInterface | SuccessInterface> {
    if (date) {
      const sentDate = new Date(date);

      if (sentDate.toString() === 'Invalid Date') {
        return {
          error: sentDate.toString(),
        };
      }

      return {
        unix: sentDate.getTime(),
        utc: sentDate.toUTCString(),
      };
    }

    const currentDate = new Date();

    return {
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    };
  }
}
