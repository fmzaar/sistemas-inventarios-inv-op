import {Component, EventEmitter, Output} from '@angular/core';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {OrderControllerService} from '../../../domain/order/order-controller.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './orders-modal.component.html'
})
export class OrdersModalComponent {
  @Output() close = new EventEmitter<void>();
  articleDropdown$ = this.orderControllerService.articleDropdown$.pipe(
    map(data => data),
    catchError(error => of([]))
  );
  providerDropdown$ = this.orderControllerService.providerDropdown$.pipe(
    map(data => data),
    catchError(error => of([]))
  );
  selectedArticle: number;
  selectedProvider: number;
  totalAmount: number = 0;

  constructor(private orderControllerService: OrderControllerService) {
    this.orderControllerService.findArticleDropdown();
  }

  closeModal() {
    this.close.emit();
  }

  generateOrder() {
    this.orderControllerService.createOrder({
      articleId: this.selectedArticle,
      providerId: this.selectedProvider
    });
  }

  findProviders() {
    console.log(JSON.stringify(this.selectedArticle));
    this.orderControllerService.findProviderByArticle(this.selectedArticle);
  }
}
