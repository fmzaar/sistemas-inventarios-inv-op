import {Component, EventEmitter, Output} from '@angular/core';
import {InventoryControllerService} from '../../../domain/inventory/inventory-controller.service';
import {Inventory} from '../../../domain/inventory/inventory.model';

@Component({
  selector: 'app-config-inventory',
  templateUrl: './config-inventory.component.html',
  styleUrls: ['./config-inventory.component.scss']
})
export class ConfigInventoryComponent {

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Inventory>();
  inventory: Inventory;

  constructor(private inventoryControllerService: InventoryControllerService) {
    this.inventoryControllerService.inventory$.subscribe(inventory => {
      if (inventory) {
        this.inventory = inventory;
      }
    });
  }


  closeModal() {
    this.close.emit();
  }

  saveInventory() {
    this.inventoryControllerService.saveInventory(this.inventory);
    this.closeModal();
  }
}
