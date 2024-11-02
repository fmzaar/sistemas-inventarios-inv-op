import {Test, TestingModule} from '@nestjs/testing';
import {DemandController} from './demand.controller';
import {DemandService} from './demand.service';

describe('DemandController', () => {
    let controller: DemandController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DemandController],
            providers: [DemandService],
        }).compile();

        controller = module.get<DemandController>(DemandController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
