import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {UserDropdownComponent} from './components/user-dropdown/user-dropdown.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleModalComponent} from './articles/article-modal/article-modal.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {ConfirmModalService} from './confirm-modal.service';
import {ConfigInventoryComponent} from './articles/config-inventory/config-inventory.component';
import {ProviderComponent} from './providers/provider.component';
import {InventoryConfigModalComponent} from './articles/inventory-config-modal/inventory-config-modal.component';
import {SalesComponent} from './sales/sales.component';
import {SalesModalComponent} from './sales/sales-modal/sales-modal.component';
import {ProviderModalComponent} from './providers/provider-modal/provider-modal.component';
import {ProviderArticleModalComponent} from './providers/provider-article-modal/provider-article-modal.component';
import {OrdersComponent} from './orders/orders.component';
import {OrdersModalComponent} from './orders/orders-modal/orders-modal.component';
import {OrderStatusModalComponent} from './orders/order-status-modal/order-status-modal.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UserDropdownComponent,
    ArticlesComponent,
    ArticleModalComponent,
    ConfirmModalComponent,
    ConfigInventoryComponent,
    ProviderComponent,
    ProviderModalComponent,
    InventoryConfigModalComponent,
    SalesComponent,
    SalesModalComponent,
    ProviderArticleModalComponent,
    OrdersComponent,
    OrdersModalComponent,
    OrderStatusModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
  ],
  providers: [ConfirmModalService],
})
export class PagesModule {
}
