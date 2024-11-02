import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Article} from '../../article/entities/article.entity';
import {PredictionConfig} from 'src/prediction-config/entities/prediction-config.entity';


@Entity()
export class Demand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({nullable: true})
    startDate: Date;

    @Column({nullable: true})
    endDate: Date;

    @Column()
    interval: string;

    @ManyToOne(() => Article, article => article.demands)
    @JoinColumn({name: 'articleId'})
    article: Article;
}
