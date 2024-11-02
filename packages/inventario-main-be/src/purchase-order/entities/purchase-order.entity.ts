import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Article} from '../../article/entities/article.entity';
import {OrderStatusEnum} from '../enum/order-status.enum';
import {Provider} from '../../provider/entities/provider.entity';

@Entity()
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    code: string;

    @Column()
    total: number;

    @Column({default: OrderStatusEnum.PENDING, type: 'enum', enum: OrderStatusEnum})
    status: OrderStatusEnum;

    @ManyToOne(() => Article, article => article.purchaseOrders)
    article: Article;

    @ManyToOne(() => Provider, provider => provider.purchaseOrders)
    provider: Provider;
}
