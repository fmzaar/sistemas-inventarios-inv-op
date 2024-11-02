import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {SalesService} from './sales.service';
import {CreateSaleDto} from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {
    }

    @Post()
    create(@Body() createSaleDto: CreateSaleDto) {
        return this.salesService.create(createSaleDto);
    }

    @Post('past')
    createFicticious() {
        return this.salesService.createPastsSales();
    }

    @Post('future')
    createFuture() {
        return this.salesService.createFutureSales();
    }


    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Get('saleArticles')
    findAllSaleArticles() {
        return this.salesService.findAllSaleArticles();
    }

    @Delete()
    DeleteAll() {
        return this.salesService.removeAll();
    }
}
