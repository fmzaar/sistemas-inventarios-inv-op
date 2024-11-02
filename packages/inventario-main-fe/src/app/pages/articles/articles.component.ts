import {Component, OnInit} from '@angular/core';
import {Article} from '../../domain/articles/articles.model';
import {ArticlesControllerService} from '../../domain/articles/articles-controller.service';
import {InventoryControllerService} from '../../domain/inventory/inventory-controller.service';
import {ConfirmModalService} from '../confirm-modal.service';
import {Inventory} from '../../domain/inventory/inventory.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles$ = this.articlesControllerService.articles$;
  selectedArticle: Article;
  isModalOpen = false;
  isInventoryModalOpen = false;
  isEdit = false;
  inventories: { key: string, name: string }[] = [
    {key: 'LOTE_FIJO', name: 'Lote fijo'},
    {key: 'INTERVALO_FIJO', name: 'Intervalo fijo'}
  ];
  selectedArticleCode: string;
  selectedInventory: Inventory;

  constructor(private articlesControllerService: ArticlesControllerService,
              private inventoryControllerService: InventoryControllerService, private confirmModalService: ConfirmModalService) {
  }

  ngOnInit() {
    this.articlesControllerService.loadArticles();
  }

  openNewArticleModal() {
    this.selectedArticle = {} as Article;
    this.isEdit = false;
    this.isModalOpen = true;
  }

  openEditArticleModal(article: Article) {
    this.selectedArticle = {...article};
    this.isEdit = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveArticle(article: Article) {
    if (this.isEdit) {
      this.articlesControllerService.updateArticle(article);
    } else {
      this.articlesControllerService.createArticle(article);
    }
    this.closeModal();
  }

  deleteArticle(article: Article) {
    this.confirmModalService.openConfirmModal('¿Estás seguro de que quieres eliminar este artículo?');
    this.confirmModalService.confirmObservable$.subscribe(confirm => {
      if (!confirm) {
        return;
      }
      this.articlesControllerService.deleteArticle(article.id);
    });
  }

  refreshArticles() {
    this.articlesControllerService.loadArticles();
  }

  findInventory(inventoryModel: string) {
    return this.inventories.find(i => i.key === inventoryModel)?.name;
  }

  openInventory(article: Article) {
    this.selectedArticleCode = article.code;
    if (article.inventory) {
      this.selectedInventory = {...article.inventory};
    }
    this.isInventoryModalOpen = true;
  }

  closeInventoryModal() {
    this.isInventoryModalOpen = false;
  }

  saveInventory(inventory: Inventory) {
    this.articlesControllerService.saveInventory(inventory)
  }
}
