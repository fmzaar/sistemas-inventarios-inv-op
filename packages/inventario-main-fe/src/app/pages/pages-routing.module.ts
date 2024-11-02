import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesComponent} from './pages.component';
import {ArticlesComponent} from './articles/articles.component';
import {ProviderComponent} from './providers/provider.component';
import {SalesComponent} from './sales/sales.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'providers',
        component: ProviderComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'purchase-orders',
        component: OrdersComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
