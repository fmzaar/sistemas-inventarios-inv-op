import {PartialType} from '@nestjs/swagger';
import {CreateProviderDto} from './create-provider.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
}
