import { Test, TestingModule } from '@nestjs/testing';
import { PartsOrServiceController } from './parts-or-service.controller';
import { PartsOrServiceService } from './parts-or-service.service';

describe('PartsOrServiceController', () => {
  let controller: PartsOrServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsOrServiceController],
      providers: [PartsOrServiceService],
    }).compile();

    controller = module.get<PartsOrServiceController>(PartsOrServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
