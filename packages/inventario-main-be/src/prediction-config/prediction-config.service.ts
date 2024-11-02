// src/prediction-config/prediction-config.service.ts
import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PredictionConfig} from './entities/prediction-config.entity';
import {CreatePredictionConfigDto} from './dto/create-prediction-config.dto';
import {UpdatePredictionConfigDto} from './dto/update-prediction-config.dto';

@Injectable()
export class PredictionConfigService {

    constructor(
        @InjectRepository(PredictionConfig)
        private readonly configRepository: Repository<PredictionConfig>,
    ) {
    }

    async createConfig(createConfigDto: CreatePredictionConfigDto): Promise<PredictionConfig> {

        try {
            const config = this.configRepository.create(createConfigDto);
            return this.configRepository.save(config);
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }

    }

    async findAll(): Promise<PredictionConfig[]> {
        return this.configRepository.find();
    }

    async findOne(id: number): Promise<PredictionConfig> {
        return this.configRepository.findOne({where: {id}});
    }

    async update(id: number, UpdatePredictionConfigDto: UpdatePredictionConfigDto): Promise<PredictionConfig> {
        await this.configRepository.update(id, UpdatePredictionConfigDto);
        return this.configRepository.findOne({where: {id}});
    }

    async remove(id: number): Promise<void> {
        await this.configRepository.delete(id);
    }


}

