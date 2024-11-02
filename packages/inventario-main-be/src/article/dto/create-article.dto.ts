import {InventoryModelEnum} from '../enum/inventoryModel.enum';

export class CreateArticleDto {
    code: string;
    name: string;
    description: string;
    inventoryModel: InventoryModelEnum;
    price: number;
}
