import { Test, TestingModule } from '@nestjs/testing';
import { PredictionConfigService } from './prediction-config.service';

describe('PredictionConfigService', () => {
  let service: PredictionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictionConfigService],
    }).compile();

    service = module.get<PredictionConfigService>(PredictionConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
