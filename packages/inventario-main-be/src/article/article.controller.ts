import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ConfigInventory } from './dto/config-inventory.dto';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Get('/check-code')
    checkCode(@Query('code') code: string) {
        return this.articleService.checkIfCodeExists(code);
    }

    @Post('/')
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articleService.create(createArticleDto);
    }

    @Post('/config-inventory')
    configInventory(@Body() configInventory: ConfigInventory) {
        return this.articleService.configInventory(configInventory);
    }

    @Get('/')
    findAll() {
        return this.articleService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.articleService.findOne(id);
    }


    @Put('/:id')
    update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articleService.update(id, updateArticleDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.articleService.remove(id);
    }



    @Get('/calculate/safety-stock')
    async calculateSecurityStock(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateSecurityStock(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }
    }

    @Get('/calculate/max-quantity')
    async calculateMaxQuantity(articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateMaxQuantity(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }
    }

    @Get('/calculate/order-quantity')
    async calculateOrderQuantity(articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateOrderQuantity(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }
    }

    @Get('/calculate/fixed-interval/:id')
    async calculateFixedInterval(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateFixedInterval(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }
    }

    @Get('/calculate/fixed-lot/:id')
    async calculateFixedLot(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateFixedLot(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }
    }

    @Get('/calculate/eoq/:id')
    async calculateEOQ(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateEOQ(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }

    @Get('/calculate/storage-cost/:id')
    async calculateStorageCost(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateStorageCost(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }

    @Get('/calculate/rop/:id')
    async calculateROP(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateROP(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }

    @Get('/calculate/cgi/:id')
    async calculateCGI(@Param('id') articleId: number): Promise<any> {
        try {
            return await this.articleService.calculateCGI(articleId);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)//
        }
    }

    @Get('/calculate/low-stock')
    async getLowStockArticles(): Promise<any> {
        return await this.articleService.getLowStockArticles();
    }

    @Get('/calculate/below-rop')
    async getBelowROP(): Promise<any> {
        return await this.articleService.getBelowROP();
    }
}
