import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {CreateProviderDto} from './dto/create-provider.dto';
import {UpdateProviderDto} from './dto/update-provider.dto';
import {CreateArticleProviderDto} from './dto/create-article-provider.dto';

@Controller('providers')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) {
    }

    @Post()
    create(@Body() createProviderDto: CreateProviderDto) {
        return this.providerService.create(createProviderDto);
    }

    @Get()
    findAll() {
        return this.providerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.providerService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
        return this.providerService.update(+id, updateProviderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providerService.remove(+id);
    }

    @Post('articles')
    createOrUpdateArticleProvider(@Body() createArticleProviderDto: CreateArticleProviderDto[]) {
        return this.providerService.createOrUpdateArticleProvider(createArticleProviderDto);
    }

    @Get(':id/articles')
    getArticleProvidersByProvider(@Param('id') id: string) {
        return this.providerService.getArticleProvidersByProvider(+id);
    }
}
