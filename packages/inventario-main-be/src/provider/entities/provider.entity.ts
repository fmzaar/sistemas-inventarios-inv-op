import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ArticleProvider} from './article-provider.entity';
import {PurchaseOrder} from '../../purchase-order/entities/purchase-order.entity';

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @OneToMany(() => ArticleProvider, articleProvider => articleProvider.provider)
    articleProviders: ArticleProvider[];

    @OneToMany(() => PurchaseOrder, purchaseOrder => purchaseOrder.provider)
    purchaseOrders: PurchaseOrder[];
}
