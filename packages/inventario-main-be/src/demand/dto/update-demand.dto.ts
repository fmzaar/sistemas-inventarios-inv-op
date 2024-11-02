import {PartialType} from '@nestjs/swagger';
import {CreateDemandDto} from './create-demand.dto';
import { Article } from 'src/article/entities/article.entity';

export class UpdateDemandDto extends PartialType(CreateDemandDto) {
    articleCode?: string;
    quantity?: number;
    interval?: 'daily' | 'monthly' | 'yearly';
    //date?:Date;
}
