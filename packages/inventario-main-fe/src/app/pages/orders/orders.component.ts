import {Component, OnInit} from '@angular/core';
import {ConfirmModalService} from '../confirm-modal.service';
import {OrderControllerService} from '../../domain/order/order-controller.service';

@Component({
  selector: 'app-sales',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders$ = this.orderControllerService.orders$;
  isOrderModalOpen = false;

  constructor(private orderControllerService: OrderControllerService, private confirmModalService: ConfirmModalService) {
  }

  ngOnInit() {
    this.orderControllerService.loadOrders();
  }

  openNewOrderModal() {
    this.isOrderModalOpen = true;
  }

  closeModal() {
    this.refreshOrders();
    this.isOrderModalOpen = false;
  }

  refreshOrders() {
    this.orderControllerService.loadOrders();
  }
}
