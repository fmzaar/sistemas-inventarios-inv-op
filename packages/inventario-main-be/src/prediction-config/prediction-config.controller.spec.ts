import { Test, TestingModule } from '@nestjs/testing';
import { PredictionConfigController } from './prediction-config.controller';

describe('PredictionConfigController', () => {
  let controller: PredictionConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionConfigController],
    }).compile();

    controller = module.get<PredictionConfigController>(PredictionConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
