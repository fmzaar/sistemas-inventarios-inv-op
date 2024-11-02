import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'integer', default: 0 })
    optimalBatch: number;

    @Column({ nullable: true, type: 'integer', default: 0 })
    reorderPoint: number;

    @Column({ nullable: true, type: 'integer', default: 0 })
    safetyStock: number;

    @Column({ nullable: true, type: 'integer', default: 0 })
    CGI: number;

    @Column({ nullable: true, type: 'integer', default: 0 })
    currentStock: number;

    @Column({ default: 0 })
    storageCost: number;

    @Column({ default: 0 })
    orderCost: number;

    @Column({ default: 0 })
    orderQuantity: number;

    @Column({ default: 0 })
    maxQuantity: number;

    @Column({ default: 0 })
    orderInterval: number;

    @OneToOne(() => Article, article => article.inventory)
    article: Article;
}
