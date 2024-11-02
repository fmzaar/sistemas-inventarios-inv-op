import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {DemandPredictionService} from './demand-prediction.service';
import {DemandPrediction} from './entities/demand-prediction.entity';
import {PredictionDto} from './dto/prediction.dto';

@Controller('demand-predictions')

export class DemandPredictionController {
    constructor(private readonly demandPredictionService: DemandPredictionService) {
    }

    @Get()
    async findAll() {
        const predictions = await this.demandPredictionService.findAll();
        const totalQuantity = await this.demandPredictionService.getTotalPredictedQuantity();
        return {predictions, totalQuantity};
    }


    @Post('predictWA/:configId')
    async predictDemandByWeightedMovingAverage(
        @Param('configId') configId: number,
        @Body() body: { articleCode: string, weights: number[], periodsToUse: number }
    ): Promise<DemandPrediction[]> {
        return this.demandPredictionService.predictDemandByWeightedMovingAverage(configId, body.articleCode, body.weights, body.periodsToUse);
    }

    @Post('predictES/:configId')
    async predictDemandByExponentialSmoothing(
        @Param('configId') configId: number,
        @Body() body: { articleCode: string, alpha: number, initialForecast: number }
    ): Promise<DemandPrediction[]> {
        return this.demandPredictionService.predictDemandByExponentialSmoothing(configId, body.articleCode, body.alpha, body.initialForecast);
    }

    @Post('predictLR/:configId')
    async predictDemandByLinealRegression(
        @Param('configId') configId: number,
        @Body() body: { articleCode: string }
    ): Promise<DemandPrediction[]> {
        return this.demandPredictionService.predictDemandByLinealRegression(configId, body.articleCode);
    }

    @Post('predictSD/:configId')
    async predictSeasonalDemand(
        @Param('configId') configId: number,
        @Body() body: { articleCode: string, nextYearPredict: number }
    ): Promise<DemandPrediction[]> {
        return this.demandPredictionService.predictSeasonalDemand(configId, body.articleCode, body.nextYearPredict);
    }

    @Post('predictBestMethod/:configId')
    async predictBestMethod(
        @Param('configId') configId: number,
        @Body() parameters: PredictionDto
    ): Promise<DemandPrediction[]> {
        return this.demandPredictionService.predictDemandByBestMethod(configId, parameters);
    }


    @Delete()
    removeAll() {
        return this.demandPredictionService.removeAll();
    }


}
