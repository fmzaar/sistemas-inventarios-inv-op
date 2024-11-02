import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Sale} from './sale.entity';
import {Article} from 'src/article/entities/article.entity';

@Entity()
export class SaleArticle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Sale, sale => sale.saleArticles, {onDelete: 'CASCADE'})
    sale: Sale;

    @ManyToOne(() => Article, article => article.saleArticles)
    article: Article;
}
