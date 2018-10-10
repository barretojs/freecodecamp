import { Controller, Get, Param } from '@nestjs/common';
import { TimestampService } from './timestamp.service';
import { SuccessInterface } from './interfaces/success.interface';
import { FailInterface } from './interfaces/fail.interface';

@Controller('api/timestamp')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) {}

  @Get('/:date?')
  async getTimestamp(
    @Param('date') date?: string,
  ): Promise<SuccessInterface | FailInterface> {
    if (date) {
      return this.timestampService.getTimestamp(date);
    }
    return this.timestampService.getTimestamp();
  }
}
