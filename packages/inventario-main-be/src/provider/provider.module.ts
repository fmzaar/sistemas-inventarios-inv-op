import {Module} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {ProviderController} from './provider.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from '../article/entities/article.entity';
import {Provider} from './entities/provider.entity';
import {ArticleProvider} from './entities/article-provider.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Article, Provider, ArticleProvider]),
    ],
    controllers: [ProviderController],
    providers: [ProviderService],
})
export class ProviderModule {
}
