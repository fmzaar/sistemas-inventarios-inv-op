import {Component, OnInit} from '@angular/core';
import {Provider} from '../../domain/providers/providers.model';
import {ProvidersControllerService} from '../../domain/providers/providers-controller.service';
import {InventoryControllerService} from '../../domain/inventory/inventory-controller.service';
import {ConfirmModalService} from '../confirm-modal.service';

@Component({
  selector: 'app-providers',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  providers$ = this.providersControllerService.providers$;
  selectedProvider: Provider;
  isModalOpen = false;
  isProviderArticleModalOpen = false;
  isEdit = false;

  constructor(private providersControllerService: ProvidersControllerService,
              private inventoryControllerService: InventoryControllerService, private confirmModalService: ConfirmModalService) {
  }

  ngOnInit() {
    this.providersControllerService.loadProviders();
  }

  openNewProviderModal() {
    this.selectedProvider = {} as Provider;
    this.isEdit = false;
    this.isModalOpen = true;
  }

  openEditProviderModal(provider: Provider) {
    this.selectedProvider = {...provider};
    this.isEdit = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isProviderArticleModalOpen = false;
  }

  saveProvider(provider: Provider) {
    if (this.isEdit) {
      this.providersControllerService.updateProvider(provider);
    } else {
      this.providersControllerService.createProvider(provider);
    }
    this.closeModal();
  }

  deleteProvider(provider: Provider) {
    this.confirmModalService.openConfirmModal('¿Estás seguro de que quieres eliminar este artículo?');
    this.confirmModalService.confirmObservable$.subscribe(confirm => {
      if (!confirm) {
        return;
      }
      this.providersControllerService.deleteProvider(provider.id);
    });
  }

  refreshProviders() {
    this.providersControllerService.loadProviders();
  }

  openConfigureArticlesModal(provider: any) {
    this.selectedProvider = provider;
    this.isProviderArticleModalOpen = true;
  }
}
