import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DemandPrediction} from './entities/demand-prediction.entity';
import {Between, Repository} from 'typeorm';
import {PredictionConfig} from 'src/prediction-config/entities/prediction-config.entity';
import {Demand} from 'src/demand/entities/demand.entity';
import {Article} from 'src/article/entities/article.entity';
import * as moment from 'moment';
import {linearRegression, sum} from 'simple-statistics'
import {PredictionDto} from './dto/prediction.dto';

@Injectable()
export class DemandPredictionService {

    constructor(
        @InjectRepository(DemandPrediction)
        private readonly predictionRepository: Repository<DemandPrediction>,
        @InjectRepository(PredictionConfig)
        private readonly configRepository: Repository<PredictionConfig>,
        @InjectRepository(Demand)
        private readonly demandRepository: Repository<Demand>,
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {
    }

    async findAll(): Promise<DemandPrediction[]> {
        return this.predictionRepository.find({relations: ['article']});
    }

    async removeAll(): Promise<void> {
        await this.predictionRepository.clear();
    }


    async predictDemandByWeightedMovingAverage(configId: number, articleCode: string, weights: number[], periodsToUse: number): Promise<DemandPrediction[]> {
        const config = await this.configRepository.findOne({where: {id: configId}});
        const periodsToPredict = config.periodsToPredict;
        const interval = config.predictionInterval;
        const errorMethod = config.errorCalculationMethod
        const acceptableError = config.acceptableError
        const DataStartDate = config.DataStartDate
        const DataEndDate = config.DataEndDate

        let intervalUnit: 'days' | 'months' | 'years';
        switch (interval) {
            case 'daily':
                intervalUnit = 'days';
                break;
            case 'monthly':
                intervalUnit = 'months';
                break;
            case 'yearly':
                intervalUnit = 'years';
                break;
            default:
                throw new Error('Invalid interval');
        }

        const demands = await this.demandRepository.find({
            where: {
                article: {code: articleCode},
                interval: interval,
                startDate: Between(DataStartDate, DataEndDate)
            },
            order: {startDate: 'ASC'},

        });

        //console.log(demands)

        if (weights.length !== (periodsToUse)) {
            throw new Error('The number of weights is incorrect.');
        }

        if (demands.length < periodsToPredict) {
            throw new Error('Not enough data points.');
        }

        let predicts: DemandPrediction[] = [];
        let startDate = moment(demands[0].endDate);

        for (let start = 0; start < periodsToPredict; start++) {
            let weightedSum = 0;
            let weightSum = 0;
            let finalError = 0

            for (let i = 0; i < periodsToUse; i++) {
                weightedSum += demands[start + i].quantity * weights[i];
                weightSum += weights[i];
            }

            let predictQuantity = weightedSum / weightSum;
            let realQuantity = demands[start + periodsToUse]?.quantity || 0;

            let errorMAD = Math.abs(realQuantity - predictQuantity)

            let errorMSE = Math.pow(realQuantity - predictQuantity, 2)

            let errorMEP = ((Math.abs(realQuantity - predictQuantity) * 1) / realQuantity)


            switch (errorMethod) {
                case 'MAD':
                    finalError = errorMAD;
                    break;
                case 'MSE':
                    finalError = errorMSE;
                    break;
                case 'MEP':
                    finalError = errorMEP;
                    break;
                default:
                    throw new Error('Invalid error method');
            }


            const prediction = new DemandPrediction();
            prediction.article = await this.articleRepository.findOne({where: {code: articleCode}});
            prediction.predictedInterval = interval;
            prediction.date = startDate.add(1, intervalUnit).toDate();
            prediction.PredictionStartDate = moment(DataEndDate).add(start, intervalUnit).toDate();
            prediction.PredictionEndDate = moment(DataEndDate).add(start + 1, intervalUnit).toDate();
            prediction.predictedQuantity = predictQuantity;
            prediction.method = 'Weighted Moving Average';
            prediction.error = errorMethod
            prediction.errorValue = finalError

            predicts.push(prediction);
        }

        let isAcceptable = this.AcceptPrediction(predicts, periodsToPredict, acceptableError)

        //if (!isAcceptable){
        //throw new Error('El error de las predicciones no es aceptable')
        //}
        await this.predictionRepository.save(predicts);
        return predicts;
    }


    async predictDemandByExponentialSmoothing(configId: number, articleCode: string, alpha: number, initialForecast: number): Promise<DemandPrediction[]> {


        const config = await this.configRepository.findOne({where: {id: configId}});
        if (!config) {
            throw new Error('Configuration not found.');
        }


        const {
            periodsToPredict,
            predictionInterval,
            errorCalculationMethod,
            acceptableError,
            DataStartDate,
            DataEndDate
        } = config;

        //let dStartDate = new Date(DataStartDate)
        //let dEndDate = new Date(DataEndDate)

        let errorMethod = errorCalculationMethod

        let intervalUnit: 'days' | 'months' | 'years';
        switch (predictionInterval) {
            case 'daily':
                intervalUnit = 'days';
                break;
            case 'monthly':
                intervalUnit = 'months';
                break;
            case 'yearly':
                intervalUnit = 'years';
                break;
            default:
                throw new Error('Invalid interval');
        }

        const demands = await this.demandRepository.find({
            where: {
                article: {code: articleCode},
                interval: predictionInterval,
                startDate: Between(DataStartDate, DataEndDate)
            },
            order: {startDate: 'ASC'},
        });

        if (demands.length < 2) {
            throw new Error('Se requieren al menos dos puntos de datos para la suavización exponencial.');
        }

        let forecast = initialForecast;
        let forecasts: number[] = [forecast];
        let startDate = moment(demands[0].endDate);
        let predicts: DemandPrediction[] = [];
        let finalError: number = 0

        for (let i = 0; i < demands.length; i++) {
            forecast = forecast + alpha * (demands[i].quantity - forecast);
            forecasts.push(forecast);

            if (i < periodsToPredict) {
                // Calcular los errores (MAD y MSE)
                let realQuantity = demands[i + 1]?.quantity || 0;
                let errorMAD = Math.abs(realQuantity - forecast);
                let errorMSE = Math.pow(realQuantity - forecast, 2);
                let errorMEP = ((Math.abs(realQuantity - forecast) * 1) / realQuantity);


                switch (errorMethod) {
                    case 'MAD':
                        finalError = errorMAD;
                        break;
                    case 'MSE':
                        finalError = errorMSE;
                        break;
                    case 'MEP':
                        finalError = errorMEP;
                        break;
                    default:
                        throw new Error('Invalid error method');
                }


                // Crear la predicción
                const prediction = new DemandPrediction();
                prediction.article = await this.articleRepository.findOne({where: {code: articleCode}});
                prediction.predictedInterval = predictionInterval;
                prediction.date = startDate.add(1, intervalUnit).toDate();
                prediction.PredictionStartDate = moment(DataEndDate).add(i, intervalUnit).toDate();
                prediction.PredictionEndDate = moment(DataEndDate).add(i + 1, intervalUnit).toDate();
                prediction.predictedQuantity = forecast;
                prediction.method = 'Exponential Smoothing';
                prediction.error = errorCalculationMethod;
                prediction.errorValue = finalError;


                predicts.push(prediction);
            }
        }

        let isAcceptable = this.AcceptPrediction(predicts, periodsToPredict, acceptableError)

        //if (!isAcceptable){
        // throw new Error('El error de las predicciones no es aceptable')
        //}
        await this.predictionRepository.save(predicts);
        return predicts;
    }


    async predictDemandByLinealRegression(configId: number, articleCode: string): Promise<DemandPrediction[]> {
        const config = await this.configRepository.findOne({where: {id: configId}});
        if (!config) {
            throw new Error('Configuration not found.');
        }

        const {
            periodsToPredict,
            predictionInterval,
            errorCalculationMethod,
            acceptableError,
            DataStartDate,
            DataEndDate
        } = config;

        let intervalUnit: 'days' | 'months' | 'years';
        switch (predictionInterval) {
            case 'daily':
                intervalUnit = 'days';
                break;
            case 'monthly':
                intervalUnit = 'months';
                break;
            case 'yearly':
                intervalUnit = 'years';
                break;
            default:
                throw new Error('Invalid interval');
        }

        const demands = await this.demandRepository.find({
            where: {
                article: {code: articleCode},
                interval: predictionInterval,
                startDate: Between(DataStartDate, DataEndDate)
            },
            order: {startDate: 'ASC'},

        });

        if (demands.length < 2) {
            throw new Error('Se requieren al menos dos puntos de datos para realizar una regresión lineal');
        }

        const data = demands.map((demand, index) => [index, demand.quantity]);
        const {m, b} = linearRegression(data);

        let startDate = moment(demands[0].endDate);
        let predicts: DemandPrediction[] = [];
        let finalError: number = 0;

        for (let i = 1; i <= periodsToPredict; i++) {
            const predictDemand = m * (data.length - 1 + i) + b;

            // Calcular los errores (MAD, MSE, MEP)
            let realQuantity = demands[i + 1]?.quantity || 0;
            let errorMAD = Math.abs(realQuantity - predictDemand);
            let errorMSE = Math.pow(realQuantity - predictDemand, 2);
            let errorMEP = realQuantity !== 0 ? (Math.abs(realQuantity - predictDemand) / realQuantity) : 0;

            switch (errorCalculationMethod) {
                case 'MAD':
                    finalError = errorMAD;
                    break;
                case 'MSE':
                    finalError = errorMSE;
                    break;
                case 'MEP':
                    finalError = errorMEP;
                    break;
                default:
                    throw new Error('Invalid error method');
            }

            // Crear la predicción
            const prediction = new DemandPrediction();
            prediction.article = await this.articleRepository.findOne({where: {code: articleCode}});
            prediction.predictedInterval = predictionInterval;
            prediction.date = startDate.add(1, intervalUnit).toDate();
            prediction.PredictionStartDate = moment(DataEndDate).add(i, intervalUnit).toDate();
            prediction.PredictionEndDate = moment(DataEndDate).add(i + 1, intervalUnit).toDate();
            prediction.predictedQuantity = predictDemand;
            prediction.method = 'Linear Regression';
            prediction.error = errorCalculationMethod;
            prediction.errorValue = finalError;

            predicts.push(prediction);
        }

        let isAcceptable = this.AcceptPrediction(predicts, periodsToPredict, acceptableError);

        //if (!isAcceptable) {
        //    throw new Error('El error de las predicciones no es aceptable');
        //}

        await this.predictionRepository.save(predicts);
        return predicts;
    }


    async predictSeasonalDemand(configId: number, articleCode: string, nextYearPredict: number): Promise<DemandPrediction[]> {
        const config = await this.configRepository.findOne({where: {id: configId}});
        if (!config) {
            throw new Error('Configuration not found.');
        }

        const {
            periodsToPredict,
            predictionInterval,
            errorCalculationMethod,
            acceptableError,
            DataStartDate,
            DataEndDate
        } = config;

        let intervalUnit: 'days' | 'months' | 'years';
        switch (predictionInterval) {
            case 'daily':
                intervalUnit = 'days';
                break;
            case 'monthly':
                intervalUnit = 'months';
                break;
            case 'yearly':
                intervalUnit = 'years';
                break;
            default:
                throw new Error('Invalid interval');
        }

        const historicalDemands = await this.demandRepository.find({
            where: {
                article: {code: articleCode},
                interval: predictionInterval,
                startDate: Between(DataStartDate, DataEndDate)
            },
            order: {startDate: 'ASC'},
        });

        const seasonalityPeriod = 12; // 12 meses en un año
        const minDataPoints = seasonalityPeriod * 3; // Mínimo de 3 años de datos

        if (historicalDemands.length < minDataPoints) {
            throw new Error('Se requieren al menos 36 meses de datos para análisis estacional.');
        }

        // Calcular promedio anual para cada mes
        const numberOfYears = Math.floor(historicalDemands.length / seasonalityPeriod);

        //console.log(numberOfYears)

        let promedioAnual: number[] = [];

        for (let month = 0; month < seasonalityPeriod; month++) {
            let monthlyDemands = [];

            for (let year = 0; year < numberOfYears; year++) {
                const demand = historicalDemands[month + year * seasonalityPeriod];
                monthlyDemands.push(demand.quantity);

            }

            const monthlyAverage = sum(monthlyDemands) / numberOfYears;

            promedioAnual.push(monthlyAverage);


            //console.log(monthlyDemands)
            //console.log(promedioAnual)
        }

        let promedioMensual = sum(promedioAnual) / seasonalityPeriod;

        let indiceMensual = []
        promedioAnual.forEach((index) => {
            indiceMensual.push(index / promedioMensual)
        });

        //console.log(promedioAnual)
        //console.log(promedioMensual)
        //console.log(indiceMensual)

        // Generar predicciones basadas en los índices estacionales

        let demandaPronosticada = []

        indiceMensual.forEach((index) => {
            demandaPronosticada.push((index * nextYearPredict) / seasonalityPeriod)
            //console.log(nextYearPredict)

        })

        //console.log(demandaPronosticada)

        let startDate = moment(historicalDemands[historicalDemands.length - 1].endDate);
        let predicts: DemandPrediction[] = [];
        let finalError: number = 0;

        for (let i = 0; i < periodsToPredict; i++) {
            let predictQuantity = demandaPronosticada[i % seasonalityPeriod];

            // Calcular los errores (MAD, MSE, MEP)
            let realQuantity = historicalDemands[i % historicalDemands.length]?.quantity || 0;
            let errorMAD = Math.abs(realQuantity - predictQuantity);
            let errorMSE = Math.pow(realQuantity - predictQuantity, 2);
            let errorMEP = realQuantity !== 0 ? (Math.abs(realQuantity - predictQuantity) / realQuantity) : 0;

            switch (errorCalculationMethod) {
                case 'MAD':
                    finalError = errorMAD;
                    break;
                case 'MSE':
                    finalError = errorMSE;
                    break;
                case 'MEP':
                    finalError = errorMEP;
                    break;
                default:
                    throw new Error('Invalid error method');
            }

            // Crear la predicción
            const predictionEntity = new DemandPrediction();
            predictionEntity.article = await this.articleRepository.findOne({where: {code: articleCode}});
            predictionEntity.predictedInterval = predictionInterval;
            predictionEntity.date = startDate.add(1, intervalUnit).toDate();
            predictionEntity.PredictionStartDate = moment(DataEndDate).add(i, intervalUnit).toDate();
            predictionEntity.PredictionEndDate = moment(DataEndDate).add(i + 1, intervalUnit).toDate();
            predictionEntity.predictedQuantity = predictQuantity;
            predictionEntity.method = 'Seasonal';
            predictionEntity.error = errorCalculationMethod;
            predictionEntity.errorValue = finalError;

            predicts.push(predictionEntity);
        }

        let isAcceptable = this.AcceptPrediction(predicts, periodsToPredict, acceptableError);

        //if (!isAcceptable) {
        //    throw new Error('El error de las predicciones no es aceptable');
        //}

        await this.predictionRepository.save(predicts);
        return predicts;
    }


    private AcceptPrediction(predicts: DemandPrediction[], periods: number, acceptableError: number): Boolean {
        let error: number = 0
        predicts.forEach((prediction) => {
            error += prediction.errorValue
        })

        let lastError = error / periods

        console.log(lastError)

        if (lastError <= acceptableError) {
            return true;
        } else {
            return false;
        }

    }


    async getTotalPredictedQuantity(): Promise<number> {
        const predictions = await this.predictionRepository.find({relations: ['article']});
        return predictions.reduce((sum, prediction) => sum + prediction.predictedQuantity, 0);
    }

    async predictDemandByBestMethod(configId: number, parameters: PredictionDto): Promise<DemandPrediction[]> {
        const config = await this.configRepository.findOne({where: {id: configId}});
        if (!config) {
            throw new Error('Configuration not found.');
        }

        const {
            periodsToPredict,
            predictionInterval,
            DataStartDate,
            DataEndDate
        } = config;

        console.log(parameters)
        // Obtener predicciones para cada método
        const predictionsWMA = await this.predictDemandByWeightedMovingAverage(configId, parameters.articleCode, parameters.weights, parameters.periodsToUse); // Ajusta los pesos y periodos según sea necesario
        const predictionsES = await this.predictDemandByExponentialSmoothing(configId, parameters.articleCode, parameters.alpha, parameters.initialForecast); // Ajusta alpha y initialForecast según sea necesario
        const predictionsLR = await this.predictDemandByLinealRegression(configId, parameters.articleCode);
        const predictionsSeasonal = await this.predictSeasonalDemand(configId, parameters.articleCode, parameters.nextYearPredict); // Ajusta nextYearPredict según sea necesario

        // Calcular errores para cada método (usando datos entre DataStartDate y DataEndDate)
        const errors = await this.calculatePredictionErrors(parameters.articleCode, predictionInterval, DataStartDate, DataEndDate,
            predictionsWMA, predictionsES, predictionsLR, predictionsSeasonal);

        // Encontrar el método con el menor error
        const bestMethod = Object.keys(errors).reduce((a, b) => errors[a] < errors[b] ? a : b);

        // Eliminar predicciones temporales (generadas solo para calcular el error)
        await this.predictionRepository.remove(predictionsWMA);
        await this.predictionRepository.remove(predictionsES);
        await this.predictionRepository.remove(predictionsLR);
        await this.predictionRepository.remove(predictionsSeasonal);

        // Generar predicciones finales con el mejor método para los periodos especificados en periodsToPredict
        let finalPredictions: DemandPrediction[];
        switch (bestMethod) {
            case 'WMA':
                finalPredictions = await this.predictDemandByWeightedMovingAverage(configId, parameters.articleCode, parameters.weights, parameters.periodsToUse);
                break;
            case 'ES':
                finalPredictions = await this.predictDemandByExponentialSmoothing(configId, parameters.articleCode, parameters.alpha, parameters.initialForecast);
                break;
            case 'LR':
                finalPredictions = await this.predictDemandByLinealRegression(configId, parameters.articleCode);
                break;
            case 'Seasonal':
                finalPredictions = await this.predictSeasonalDemand(configId, parameters.articleCode, parameters.nextYearPredict);
                break;
            default:
                throw new Error('Método de predicción inválido.');
        }

        return finalPredictions;
    }

    private async calculatePredictionErrors(articleCode: string, interval: string, startDate: Date, endDate: Date,
                                            ...predictions: DemandPrediction[][]): Promise<{
        [method: string]: number
    }> {
        const demands = await this.demandRepository.find({
            where: {
                article: {code: articleCode},
                interval: interval,
                startDate: Between(startDate, endDate)
            },
            order: {startDate: 'ASC'},
        });

        const errors = {WMA: 0, ES: 0, LR: 0, Seasonal: 0};

        demands.forEach((demand, index) => {
            errors.WMA += this.calculateError(demand.quantity, predictions[0][index]?.predictedQuantity || 0);
            errors.ES += this.calculateError(demand.quantity, predictions[1][index]?.predictedQuantity || 0);
            errors.LR += this.calculateError(demand.quantity, predictions[2][index]?.predictedQuantity || 0);
            errors.Seasonal += this.calculateError(demand.quantity, predictions[3][index]?.predictedQuantity || 0);
        });

        return errors;
    }

    private calculateError(real: number, predicted: number): number {

        let mad = Math.abs(real - predicted);
        let mse = Math.pow(real - predicted, 2);
        let mep = (mad / real)
        //console.log('MAD',mad)
        //console.log('MSE',mse)
        //console.log('MEP',mep)
        let minError = Math.min(mad * 100, mse, mep * 100)

        console.log('min', minError)

        return minError
    }


}
