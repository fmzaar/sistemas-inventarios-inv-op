import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SaleArticle} from './saleArticle.entity';


@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    code: string;
    @Column()
    date: Date;
    @Column()
    total: number;

    @OneToMany(() => SaleArticle, SaleArticle => SaleArticle.sale, {cascade: true})
    saleArticles: SaleArticle[];
}
