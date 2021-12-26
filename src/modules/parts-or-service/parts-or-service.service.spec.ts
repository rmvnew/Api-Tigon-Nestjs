import { Test, TestingModule } from '@nestjs/testing';
import { PartsOrServiceService } from './parts-or-service.service';

describe('PartsOrServiceService', () => {
  let service: PartsOrServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsOrServiceService],
    }).compile();

    service = module.get<PartsOrServiceService>(PartsOrServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
