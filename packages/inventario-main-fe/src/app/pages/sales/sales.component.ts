import {Component, OnInit} from '@angular/core';
import {ConfirmModalService} from '../confirm-modal.service';
import {SalesControllerService} from '../../domain/sales/sales-controller.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales$ = this.salesControllerService.sales$;
  isSalesOpen = false;

  constructor(private salesControllerService: SalesControllerService, private confirmModalService: ConfirmModalService) {
  }

  ngOnInit() {
    this.salesControllerService.loadSales();
  }

  openNewSalesModal() {
    this.isSalesOpen = true;
  }

  closeModal() {
    this.isSalesOpen = false;
  }

  refreshSales() {
    this.salesControllerService.loadSales();
  }
}
