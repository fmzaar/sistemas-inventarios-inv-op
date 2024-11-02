import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../../article/entities/article.entity';
import { Provider } from './provider.entity';


@Entity()
export class ArticleProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchasePrice: number;

    @Column({ type: 'integer' })
    priority: number;

    @Column({ type: 'integer', default: 0 })
    daysDelay: number;

    @ManyToOne(() => Article, article => article.articleProviders)
    article: Article;

    @ManyToOne(() => Provider, provider => provider.articleProviders)
    provider: Provider;
}
