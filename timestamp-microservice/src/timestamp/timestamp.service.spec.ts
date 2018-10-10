import { Test, TestingModule } from '@nestjs/testing';
import { TimestampService } from './timestamp.service';
import {} from 'ts-jest';

describe('Timestamp Service', () => {
  let module: TestingModule;

  let timeStampService: TimestampService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [TimestampService]
    }).compile();

    timeStampService = module.get<TimestampService>(TimestampService);
  });

  describe('getTimestamp', () => {
    it('should return a valid JSON structure for string', async () => {
      const resultWithTimestamp = {
        unix: 1539099900000,
        utc: 'Tue, 09 Oct 2018 15:45:00 GMT'
      };

      const date = '2018-10-09Z15:45:00.000Z';

      const sentDate = new Date(date);

      expect(!!date).toBeTruthy();

      expect(sentDate.toString()).not.toBe('Invalid Date');

      expect(await timeStampService.getTimestamp(date)).toEqual(
        resultWithTimestamp
      );
    });

    it('should return a valid JSON structure without string', async () => {
      const date = new Date();

      const resultWithoutTimestamp = {
        unix: date.getTime(),
        utc: date.toUTCString()
      };

      expect(date).toBeInstanceOf(Date);

      expect(await timeStampService.getTimestamp()).toEqual(
        resultWithoutTimestamp
      );
    });

    it('should not return a valid JSON structure', async () => {
      const date = new Date('asdasd');

      const resultWithWrongTimestamp = {
        error: 'Invalid Date'
      };

      expect(date.toString()).toBe('Invalid Date');

      expect(await timeStampService.getTimestamp('asdasd')).toEqual(
        resultWithWrongTimestamp
      );
    });
  });
});
