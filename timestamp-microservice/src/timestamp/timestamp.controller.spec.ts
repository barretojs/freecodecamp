import { Test, TestingModule } from '@nestjs/testing';
import { TimestampController } from './timestamp.controller';
import { TimestampService } from './timestamp.service';
import {} from 'ts-jest';

describe('Timestamp Controller', () => {
  let module: TestingModule;

  let timestampController: TimestampController;
  let timeStampService: TimestampService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TimestampController],
      providers: [TimestampService],
    }).compile();

    timestampController = module.get<TimestampController>(TimestampController);
    timeStampService = module.get<TimestampService>(TimestampService);
  });

  describe('getTimestamp', () => {
    it('should return a valid JSON structure for string', async () => {
      const resultWithTimestamp = {
        unix: 1539099900000,
        utc: 'Tue, 09 Oct 2018 15:45:00 GMT',
      };

      jest
        .spyOn(timeStampService, 'getTimestamp')
        .mockImplementation(() => resultWithTimestamp);

      expect(
        await timestampController.getTimestamp('2018-10-09Z15:45:00.000Z'),
      ).toBe(resultWithTimestamp);
    });

    it('should return a valid JSON structure without string', async () => {
      const date = new Date();

      const resultWithoutTimestamp = {
        unix: date.getTime(),
        utc: date.toUTCString(),
      };

      jest
        .spyOn(timeStampService, 'getTimestamp')
        .mockImplementation(() => resultWithoutTimestamp);

      expect(await timestampController.getTimestamp()).toBe(
        resultWithoutTimestamp,
      );
    });

    it('should not return a valid JSON structure', async () => {
      const date = new Date('asdasd');

      const resultWithWrongTimestamp = {
        error: 'Invalid Date',
      };

      jest
        .spyOn(timeStampService, 'getTimestamp')
        .mockImplementation(() => resultWithWrongTimestamp);

      expect(await timestampController.getTimestamp('asdasd')).toBe(
        resultWithWrongTimestamp,
      );
    });
  });
});
