import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';

describe('UrlShortener Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UrlShortenerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UrlShortenerController = module.get<UrlShortenerController>(UrlShortenerController);
    expect(controller).toBeDefined();
  });
});
