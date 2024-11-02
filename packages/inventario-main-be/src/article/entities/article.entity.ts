import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Demand} from '../../demand/entities/demand.entity';
import {PurchaseOrder} from '../../purchase-order/entities/purchase-order.entity';
import {Inventory} from './inventory.entity';
import {DemandPrediction} from '../../demand-prediction/entities/demand-prediction.entity';
import {ArticleProvider} from '../../provider/entities/article-provider.entity';
import {SaleArticle} from 'src/sales/entities/saleArticle.entity';
import {InventoryModelEnum} from '../enum/inventoryModel.enum';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    code: string;

    @Column({unique: true, nullable: false})
    name: string;

    @Column()
    description: string;

    @Column()
    inventoryModel: InventoryModelEnum;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @OneToOne(() => Inventory, inventory => inventory.article, {cascade: true})
    @JoinColumn()
    inventory: Inventory;

    @OneToMany(() => PurchaseOrder, purchaseOrder => purchaseOrder.article)
    purchaseOrders: PurchaseOrder[];

    @OneToMany(() => Demand, demand => demand.article)
    demands: Demand[];

    @OneToMany(() => DemandPrediction, demandPrediction => demandPrediction.article)
    demandPredictions: DemandPrediction[];


    @OneToMany(() => ArticleProvider, articleProvider => articleProvider.article)
    articleProviders: ArticleProvider[];

    @OneToMany(() => SaleArticle, SaleArticle => SaleArticle.article)
    saleArticles: SaleArticle[];

}
