import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateProviderDto} from './dto/create-provider.dto';
import {UpdateProviderDto} from './dto/update-provider.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Provider} from './entities/provider.entity';
import {CreateArticleProviderDto} from './dto/create-article-provider.dto';
import {ArticleProvider} from './entities/article-provider.entity';
import {Article} from '../article/entities/article.entity';

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider)
        private providerRepository: Repository<Provider>,
        @InjectRepository(ArticleProvider)
        private articleProviderRepository: Repository<ArticleProvider>,
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {
    }

    async create(createProviderDto: CreateProviderDto) {
        await this.checkIfNameExists(createProviderDto.name);
        return this.providerRepository.save(createProviderDto);
    }

    findAll() {
        return this.providerRepository.find();
    }

    findOne(id: number) {
        return this.providerRepository.findOne({ where: { id } });
    }

    async update(id: number, updateProviderDto: UpdateProviderDto) {
        await this.checkIfNameExists(updateProviderDto.name, id);
        return this.providerRepository.update(id, updateProviderDto);
    }

    remove(id: number) {
        return this.providerRepository.delete(id);
    }

    private async checkIfNameExists(name: string, id?: number) {
        const provider = await this.providerRepository.findOne({ where: { name } });
        if (id && provider && provider.id !== id) {
            throw new BadRequestException('El nombre del proveedor ya existe');
        }
        if (!id && provider) {
            throw new BadRequestException('El nombre del proveedor ya existe');
        }
    }


    async createOrUpdateArticleProvider(createOrUpdateDto: CreateArticleProviderDto[]) {
        for (const createOrUpdate of createOrUpdateDto) {
            if ((createOrUpdate.purchasePrice && createOrUpdate.purchasePrice > 0) || (createOrUpdate.priority && createOrUpdate.priority > 0)) {
                await this.createOrUpdateArticleProviderSingle(createOrUpdate);
            }
        }
    }

    async createOrUpdateArticleProviderSingle(createOrUpdateDto: CreateArticleProviderDto): Promise<ArticleProvider> {
        const {articleId, providerId, purchasePrice, priority, daysDelay} = createOrUpdateDto;
        let articleProvider = await this.articleProviderRepository.findOne({
            where: {
                article: { id: articleId },
                provider: { id: providerId }
            }
        });
        const article = await this.articleRepository.findOne({ where: { id: articleId } });
        const provider = await this.providerRepository.findOne({ where: { id: providerId } });
        if (articleProvider) {
            articleProvider.purchasePrice = purchasePrice;
            articleProvider.priority = priority;
            articleProvider.daysDelay = daysDelay;
        } else {
            articleProvider = this.articleProviderRepository.create({
                article,
                provider,
                purchasePrice,
                priority,
                daysDelay
            });
        }
        return this.articleProviderRepository.save(articleProvider);
    }

    async getArticleProvidersByProvider(providerId: number) {
        return this.articleProviderRepository.find({
            relations: ['article', 'provider'],
            where: { provider: { id: providerId } }
        }).then(articleProviders => {
            return articleProviders.map(articleProvider => ({
                id: articleProvider.id,
                articleId: articleProvider.article.id,
                providerId: articleProvider.provider.id,
                purchasePrice: articleProvider.purchasePrice,
                priority: articleProvider.priority,
                daysDelay: articleProvider.daysDelay
            }));
        }
        );

    }
}

