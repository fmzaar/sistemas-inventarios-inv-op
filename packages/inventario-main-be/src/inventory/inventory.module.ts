import {Module} from '@nestjs/common';
import {InventoryService} from './inventory.service';
import {InventoryController} from './inventory.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Inventory} from '../article/entities/inventory.entity';
import {Article} from '../article/entities/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Inventory, Article])],
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule {
}
