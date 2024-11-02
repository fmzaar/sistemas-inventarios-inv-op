import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    BadRequestException,
    Query
} from '@nestjs/common';
import {DemandService} from './demand.service';
import {CreateDemandDto} from './dto/create-demand.dto';
import {UpdateDemandDto} from './dto/update-demand.dto';

@Controller('demands')

export class DemandController {
    constructor(private readonly demandService: DemandService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createDemandDto: CreateDemandDto) {
        return this.demandService.create(createDemandDto);
    }

    @Get()
    findAll() {
        return this.demandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.demandService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateDemandDto: UpdateDemandDto) {
        return this.demandService.update(id, updateDemandDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.demandService.remove(id);
    }
    @Delete()
    removeAll(){
        return this.demandService.removeAll();
    }

    // Additional endpoints for specific demand functionalities
    @Get('/load-historical-demand')
    loadHistoricalDemand() {
        return this.demandService.loadHistoricalDemand();
    }

    /*@Post('/predict-demand/weighted-moving-average')
    async predictDemandWeightedMovingAverage(@Body() body: { articleId: number,configId:number,weights: number[] }) {
        try{
        return await this.demandService.predictDemandByWeightedMovingAverage(body.articleId, body.configId,body.weights);
        } catch(error){
            throw new BadRequestException(error.message)
        }
    }

    @Post('/predict-demand/exponential-smoothing')
    predictDemandExponentialSmoothing(@Body() body: { articleId: number, alpha: number, previousPredict: number, configId:number }) {
        return this.demandService.predictDemandByExponentialSmoothing(body.articleId, body.alpha, body.previousPredict, body.configId);
    }



    @Post('/predict-demand/linear-regression')
    predictDemandLinearRegression(@Body() body: { articleId: number,  configId: number }) {
        return this.demandService.predictDemandByLinearRegression(body.articleId,  body.configId);
    }


    @Post('/predict-demand/predict-seasonal-demand')
    predictSeasonalDemand(@Body() body: { articleId: number,prediction: number, configId: number }) {
        return this.demandService.predictSeasonalDemand(body.articleId,body.prediction, body.configId);
    }

    */













    /*
        //@Get('/measure-error')
        //measureError() {
        //    return this.demandService.measureError();
        //}

        @Patch('/generate-purchase-order')
        generatePurchaseOrder() {
            return this.demandService.generatePurchaseOrder();
        }


        //CHEQUEAR TODO LO DE ACA ABAJO, NO LO PUDE HACER FUNCIONAR XDXD

        @Post('set-parameters')
        setGeneralParameters(@Body() params: { predictionPeriods: number; errorMethod: 'MAE' | 'MSE' | 'RMSE'; acceptableError: number }): void {
            this.demandService.setGeneralParameters(params)
            console.log(params)

        }

        @Get('predict/:articleId')
        async predictBestMethod(
            @Param('articleId') articleId: number,
            //@Query('configId') configId: number,
            @Query() additionalParams?: any
        ): Promise<any> {
            //return {articleId,  additionalParams}
            return this.demandService.predictBestMethod(articleId, 7, additionalParams);
        }

        @Get('compare-simulations')
        async compareSimulations(): Promise<string> {
            return this.demandService.compareSimulations();
        }
        @Get('actual-demands')
        async getActualDemand(@Param('articleId') articleId: number): Promise<number[]> {
            return this.demandService.getActualDemand(articleId, 12);
        }
    */
}
