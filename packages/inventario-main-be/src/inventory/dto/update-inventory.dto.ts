import {PartialType} from '@nestjs/swagger';
import {CreateInventoryDto} from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
    codeArticle?: string;
    optimalBatch?: number;
    reorderPoint?: number;
    actualStock?: number;
    safetyStock?: number;
    CGI?: number;
}
