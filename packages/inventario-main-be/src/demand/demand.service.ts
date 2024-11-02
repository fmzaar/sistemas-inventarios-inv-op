import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateDemandDto} from './dto/create-demand.dto';
import {UpdateDemandDto} from './dto/update-demand.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Demand} from './entities/demand.entity';
import {Repository} from 'typeorm';
import {Article} from 'src/article/entities/article.entity';
import {DemandPrediction} from 'src/demand-prediction/entities/demand-prediction.entity';
import {Sale} from 'src/sales/entities/sale.entity';
import * as moment from 'moment';
import {SaleArticle} from 'src/sales/entities/saleArticle.entity';


@Injectable()
export class DemandService {
    constructor(
        @InjectRepository(Demand)
        private readonly demandRepository: Repository<Demand>,
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        @InjectRepository(SaleArticle)
        private readonly saleArticleRepository: Repository<SaleArticle>,
        @InjectRepository(DemandPrediction)
        private readonly predictionRepository: Repository<DemandPrediction>,
        //private configService: PredictionConfigService,

    ) {
    }


    async create(createDemandDto: CreateDemandDto): Promise<Demand[]> {
        const {articleCode, interval, startDate, endDate} = createDemandDto;

        const article = await this.articleRepository.findOne({where: {code: articleCode}});
        if (!article) {
            throw new BadRequestException('Artículo no encontrado');
        }
        ;

        const sDate = new Date(startDate)
        const eDate = new Date(endDate)

        const saleArticles = await this.getSaleArticles(articleCode, sDate, eDate);

        const demandMap = this.initializeDemandMap(sDate, eDate, interval);

        this.aggregateSalesIntoDemandMap(saleArticles, demandMap, interval);

        //const demands = this.createDemandEntities(demandMap, article, interval);

        const demands = await this.checkAndCreateOrUpdateDemands(demandMap, article, interval);

        return await this.demandRepository.save(demands);
    }

    private async getSaleArticles(articleCode: string, startDate: Date, endDate: Date): Promise<SaleArticle[]> {
        return this.saleArticleRepository.createQueryBuilder('saleArticle')
            .leftJoinAndSelect('saleArticle.sale', 'sale')
            .leftJoinAndSelect('saleArticle.article', 'article')
            .where('article.code = :articleCode', {articleCode})
            .andWhere('sale.date BETWEEN :startDate AND :endDate', {startDate, endDate})
            .orderBy('sale.date', 'ASC')
            .getMany();
    }

    private initializeDemandMap(startDate: Date, endDate: Date, interval: string): Map<string, number> {
        const demandMap = new Map<string, number>();
        const start = moment(startDate);
        const end = moment(endDate);
        let momentUnit: moment.unitOfTime.DurationConstructor;

        switch (interval) {
            case 'daily':
                momentUnit = 'days';
                break;
            case 'monthly':
                momentUnit = 'months';
                break;
            case 'yearly':
                momentUnit = 'years';
                break;
            default:
                throw new Error('Invalid interval');
        }

        for (let date = start; date.isBefore(end); date.add(1, momentUnit)) {
            const dateKey = this.getFormattedDateKey(date, interval);
            demandMap.set(dateKey, 0);
        }

        return demandMap;
    }

    private getFormattedDateKey(date: moment.Moment, interval: string): string {
        switch (interval) {
            case 'daily':
                return date.format('YYYY-MM-DD');
            case 'monthly':
                return date.format('YYYY-MM');
            case 'yearly':
                return date.format('YYYY');
            default:
                throw new Error('Invalid interval');
        }
    }

    private aggregateSalesIntoDemandMap(saleArticles: SaleArticle[], demandMap: Map<string, number>, interval: string): void {
        saleArticles.forEach(saleArticle => {
            const dateKey = this.getFormattedDateKey(moment(saleArticle.sale.date), interval);
            if (demandMap.has(dateKey)) {
                demandMap.set(dateKey, demandMap.get(dateKey) + saleArticle.quantity);
            }
        });
    }

    private createDemandEntities(demandMap: Map<string, number>, article: Article, interval: string): Demand[] {
        const demands: Demand[] = [];

        const existingDemand = this.demandRepository.findOne({
            where: {interval: interval, article: article},
            relations: ['article']
        });

        if (!existingDemand) {
            throw new BadRequestException('La demanda ya existe');
        }
        ;


        for (const [date, quantity] of demandMap.entries()) {
            const demand = new Demand();
            demand.article = article;
            demand.startDate = new Date(date);
            demand.endDate = this.getEndDate(new Date(date), interval);
            demand.quantity = quantity;
            demand.interval = interval;
            demands.push(demand);
        }

        return demands;
    }

    private getEndDate(startDate: Date, interval: string): Date {
        const start = moment(startDate);

        switch (interval) {
            case 'daily':
                return start.add(1, 'days').toDate();
            case 'monthly':
                return start.add(1, 'months').toDate();
            case 'yearly':
                return start.add(1, 'years').toDate();
            default:
                throw new Error('Invalid interval');
        }
    }

    private async checkAndCreateOrUpdateDemands(demandMap: Map<string, number>, article: Article, interval: string): Promise<Demand[]> {
        const demands: Demand[] = [];

        for (const [date, quantity] of demandMap.entries()) {
            const startDate = new Date(date);
            const endDate = this.getEndDate(startDate, interval);

            let demand = await this.demandRepository.findOne({
                where: {
                    article: article,
                    startDate: startDate,
                    endDate: endDate,
                    interval: interval
                }
            });

            if (demand) {
                // Actualizar la demanda existente
                demand.quantity += quantity;
            } else {
                // Crear una nueva demanda
                demand = new Demand();
                demand.article = article;
                demand.startDate = startDate;
                demand.endDate = endDate;
                demand.quantity = quantity;
                demand.interval = interval;
            }

            demands.push(demand);
        }

        return demands;
    }


    async findAll(): Promise<Demand[]> {
        return this.demandRepository.find({relations: ['article']});
    }

    async findOne(id: number): Promise<Demand> {
        return this.demandRepository.findOne({where: {id}, relations: ['article']});
    }

    async update(id: number, updateDemandDto: UpdateDemandDto): Promise<Demand> {
        await this.demandRepository.update(id, updateDemandDto);
        return this.demandRepository.findOne({where: {id}, relations: ['article']});
    }

    async remove(id: number): Promise<void> {
        await this.demandRepository.delete(id);
    }

    async removeAll(): Promise<void> {
        await this.demandRepository.clear();
    }

    async loadHistoricalDemand(): Promise<any> {
        // TODO: Implement the logic to load historical demand here
    }

}
