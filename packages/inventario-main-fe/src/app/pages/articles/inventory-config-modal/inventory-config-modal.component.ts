import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Inventory} from '../../../domain/inventory/inventory.model';

@Component({
  selector: 'app-inventory-config-modal',
  templateUrl: './inventory-config-modal.component.html',
  styleUrls: ['./inventory-config-modal.component.scss']
})
export class InventoryConfigModalComponent implements OnInit {
  @Input() articleCode: string;
  @Input() inventory: Inventory = {
    optimalBatch: 0,
    reorderPoint: 0,
    safetyStock: 0,
    CGI: 0,
    currentStock: 0,
    storageCost: 0,
    orderCost: 0,
    maxQuantity: 0,
    orderQuantity: 0
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Inventory>();

  inventoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.inventoryForm = this.formBuilder.group({
      optimalBatch: ['', Validators.required],
      reorderPoint: ['', Validators.required],
      safetyStock: ['', Validators.required],
      CGI: ['', Validators.required],
      currentStock: ['', Validators.required],
      storageCost: ['', Validators.required],
      orderCost: ['', Validators.required],
      maxQuantity: ['', Validators.required],
      orderQuantity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.inventoryForm.patchValue(this.inventory);
  }

  closeModal() {
    this.close.emit();
  }

  saveInventory() {
    if (this.inventoryForm.valid) {
      const inventory: Inventory = {
        ...this.inventoryForm.value,
        codeArticle: this.articleCode
      };
      this.save.emit(inventory);
      this.closeModal();
      this.inventoryForm.reset();
    }
  }
}
