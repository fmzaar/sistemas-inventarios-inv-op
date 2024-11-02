import {BadRequestException, Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PurchaseOrderService} from './purchase-order.service';
import {CreatePurchaseOrderDto} from './dto/create-purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrderController {
    constructor(private readonly purchaseOrderService: PurchaseOrderService) {
    }


    @Post()
    create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
        return this.purchaseOrderService.createManualOrder(createPurchaseOrderDto);
    }

    @Get('article-dropdown')
    getArticleDropdown() {
        return this.purchaseOrderService.getArticleDropdown();
    }

    @Get('article/:id')
    getArticleById(@Param('id') id: string) {
        return this.purchaseOrderService.getArticleById(+id);
    }

    @Get('article/:id/providers')
    getProvidersByArticleId(@Param('id') id: string) {
        return this.purchaseOrderService.getProvidersByArticleId(+id);
    }

    @Get()
    findAll() {
        return this.purchaseOrderService.findAll();
    }

    @Get('/cancel/:id')
    async cancelOrderStatus(@Param('id') orderId: number): Promise<any> {
        try {
            return await this.purchaseOrderService.cancelOrderStatus(orderId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }

    @Get('/complete/:id')
    async completeOrderStatus(@Param('id') orderId: number): Promise<any> {
        try {
            return await this.purchaseOrderService.completeOrderStatus(orderId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }
}
