import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserModule} from './user/user.module';
import {SharedModule} from '../shared/shared.module';
import {DemandModule} from './demand/demand.module';
import {ArticlesModule} from './articles/articles.module';
import {InventoryModule} from './inventory/inventory.module';
import {ProvidersModule} from './providers/providers.module';
import {SalesModule} from './sales/sales.module';
import {OrderModule} from './order/order.module';

const DOMAIN_MODULE = [
  CommonModule,
  UserModule,
  DemandModule,
  ArticlesModule,
  InventoryModule,
  ProvidersModule,
  SalesModule,
  OrderModule,
];

@NgModule({
  declarations: [],
  imports: [...DOMAIN_MODULE, SharedModule],
  exports: DOMAIN_MODULE,
})
export class DomainModule {
}
