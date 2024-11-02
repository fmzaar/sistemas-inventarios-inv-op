import {Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import {InventoryService} from './inventory.service';
import {CreateInventoryDto} from './dto/create-inventory.dto';
import {UpdateInventoryDto} from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {
    }

@Post()
async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
        return await this.inventoryService.create(createInventoryDto);
    } catch (error) {
        console.error('Error creating inventory:', error);
        throw new BadRequestException(error.message);
    }
}

    @Get()
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto) {
        return this.inventoryService.update(id, updateInventoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.inventoryService.remove(id);
    }

    // Additional endpoints for specific inventory calculations
    @Get('/calculate/fixed-lot')
    calculateFixedLot() {
        return this.inventoryService.calculateFixedLot();
    }

    @Get('/calculate/fixed-interval')
    calculateFixedInterval() {
        return this.inventoryService.calculateFixedInterval();
    }

    @Get('/calculate/cgi')
    calculateCGI() {
        return this.inventoryService.calculateCGI();
    }

    @Get('/list/replenishment-products')
    listReplenishmentProducts() {
        return this.inventoryService.listReplenishmentProducts();
    }

    @Get('/list/missing-products')
    listMissingProducts() {
        return this.inventoryService.listMissingProducts();
    }
}
