import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Article} from '../../article/entities/article.entity';

@Entity()
export class DemandPrediction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({nullable: true})
    PredictionStartDate: Date;

    @Column({nullable: true})
    PredictionEndDate: Date;

    @Column()
    predictedInterval: string;

    @Column()
    predictedQuantity: number;

    @Column()
    method: string;

    @Column({default: 'MSE'})
    error: string;

    @Column('decimal', {precision: 6, scale: 2})
    errorValue: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Article, article => article.demandPredictions)
    article: Article;
}
