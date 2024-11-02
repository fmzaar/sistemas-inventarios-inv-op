import {PartialType} from '@nestjs/swagger';
import {CreateArticleDto} from './create-article.dto';
import {InventoryModelEnum} from '../enum/inventoryModel.enum';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    code?: string;
    name?: string;
    description?: string;
    inventoryModel?: InventoryModelEnum;
    price: number;
}
