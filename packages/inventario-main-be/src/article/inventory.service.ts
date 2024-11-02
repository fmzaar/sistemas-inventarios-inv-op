import {Injectable} from '@nestjs/common';
import {CreateInventoryDto} from './dto/create-inventory.dto';
import {UpdateInventoryDto} from './dto/update-inventory.dto';
import {Inventory} from './entities/inventory.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) {
    }

    async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        const inventory = this.inventoryRepository.create(createInventoryDto);
        return this.inventoryRepository.save(inventory);
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find({relations: ['article']});
    }

    async findOne(id: number): Promise<Inventory> {
        return this.inventoryRepository.findOne({where: {id}, relations: ['article']});
    }

    async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
        await this.inventoryRepository.update(id, updateInventoryDto);
        return this.inventoryRepository.findOne({where: {id}, relations: ['article']});
    }

    async remove(id: number): Promise<void> {
        await this.inventoryRepository.delete(id);
    }

    async calculateFixedLot(): Promise<any> {
        // TODO: Implement the fixed lot calculation logic here
    }

    async calculateFixedInterval(): Promise<any> {
        // TODO: Implement the fixed interval calculation logic here
    }

    async calculateCGI(): Promise<any> {
        // TODO: Implement the CGI calculation logic here
    }

    async listReplenishmentProducts(): Promise<Inventory[]> {
        // TODO: Implement the logic to list replenishment products here
        return null;
    }

    async listMissingProducts(): Promise<Inventory[]> {
        // TODO: Implement the logic to list missing products here
        return null;
    }
}
