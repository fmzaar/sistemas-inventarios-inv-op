import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Provider} from '../../../domain/providers/providers.model';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.scss']
})
export class ProviderModalComponent {
  @Input() provider: Provider;
  @Input() isEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Provider>();

  closeModal() {
    this.close.emit();
  }

  saveProvider(providerForm: NgForm) {
    if (providerForm.valid) {
      this.save.emit(this.provider);
      this.closeModal();
    }
  }
}
