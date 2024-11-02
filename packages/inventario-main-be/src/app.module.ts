import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import * as process from 'process';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {DemandModule} from './demand/demand.module';
import {PurchaseOrderModule} from './purchase-order/purchase-order.module';
import {ArticleModule} from './article/article.module';
import {DemandPredictionModule} from './demand-prediction/demand-prediction.module';
import {PredictionConfigModule} from './prediction-config/prediction-config.module';
import {ProviderModule} from './provider/provider.module';
import {SalesModule} from './sales/sales.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT, 10),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        DemandModule,
        PurchaseOrderModule,
        ArticleModule,
        DemandPredictionModule,
        PredictionConfigModule,
        ProviderModule,
        SalesModule,
    ],
})
export class AppModule {
}

