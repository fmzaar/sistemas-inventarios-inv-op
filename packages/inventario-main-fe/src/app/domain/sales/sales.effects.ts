import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SalesApiService} from './sales-api.service';
import * as ProviderActions from './sales.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {RootObjectResponse} from './sales.model';

@Injectable()
export class SalesEffects {
  loadSales$ = createEffect(() => this.actions$.pipe(
      ofType(ProviderActions.loadSales),
      switchMap(() => this.saleApiService.getSales().pipe(
        map(data => ProviderActions.loadSalesSuccess({data})),
        catchError(error => of(ProviderActions.loadSalesFailure({error})))
      ))
    )
  );

  createSale$ = createEffect(() => this.actions$.pipe(
    ofType(ProviderActions.createSale),
    switchMap(async ({data}) => {
      try {
        const response = await this.saleApiService.generateSale(data).toPromise();
        if (response && response.ordersCreated.length > 0) {
          const {title, text, textConfirm} = this.getTextCreateSale(response);
          await this.sweetalertService.showSimpleAlertSucess(title, text, textConfirm);
        }
        return ProviderActions.createSaleSuccess() && ProviderActions.loadSales();
      } catch (error) {
        return ProviderActions.createSaleFailure({error});
      }
    })
  ));

  getTextCreateSale = (data: RootObjectResponse) => {
    const title = `se generaron las siguientes ordenes de compra`;
    const text = this.generateOrderSummary(data);
    return {title, text, textConfirm: 'Aceptar'};

  }

  generateOrderSummary(response: RootObjectResponse): string {
    const {ordersCreated} = response;

    let createdOrdersCount = 0;
    let modifiedOrdersCount = 0;
    let createdOrdersDetails = '';
    let modifiedOrdersDetails = '';

    ordersCreated.forEach(orderStatus => {
      const {order, status} = orderStatus;
      const {article, quantity, code} = order;

      if (status === 'created') {
        createdOrdersCount++;
        createdOrdersDetails += `<p>Orden creada - Código: ${code}, Artículo: ${article?.name}, Cantidad: ${quantity}</p>`;
      } else if (status === 'updated') {
        modifiedOrdersCount++;
        modifiedOrdersDetails += `<p>Orden modificada - Código: ${code}, Artículo: ${article?.name ?? 'N/A'}, Cantidad: ${quantity}</p>`;
      }
    });

    return `
    <p>Se han creado ${createdOrdersCount} órdenes y modificado ${modifiedOrdersCount} órdenes.</p>
    <h3>Órdenes creadas:</h3>
    ${createdOrdersDetails}
    <h3>Órdenes modificadas:</h3>
    ${modifiedOrdersDetails}
  `;
  }


  getArticleDropdown$ = createEffect(() => this.actions$.pipe(
      ofType(ProviderActions.findArticleDropdown),
      switchMap(() => this.saleApiService.getArticles().pipe(
        map(data => ProviderActions.findArticleDropdownSuccess({data})),
        catchError(error => of(ProviderActions.findArticleDropdownFailure({error})))
      ))
    )
  );


  constructor(private actions$: Actions,
              private saleApiService: SalesApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
