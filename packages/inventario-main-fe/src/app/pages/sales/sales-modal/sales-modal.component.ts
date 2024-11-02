import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SalesControllerService} from '../../../domain/sales/sales-controller.service';
import {ArticleDropdown} from '../../../domain/sales/sales.model';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-sales-modal',
  templateUrl: './sales-modal.component.html',
  styleUrls: ['./sales-modal.component.scss']
})
export class SalesModalComponent {
  @Output() close = new EventEmitter<void>();
  dropdown$ = this.salesControllerService.dropdown$.pipe(
    map(articles => articles || []),
    catchError(() => of([]))
  );
  selectedArticles: { article: ArticleDropdown, quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(private salesControllerService: SalesControllerService) {
    this.salesControllerService.findArticleDropdown();
  }

  closeModal() {
    this.close.emit();
  }

  generateSale(saleForm: NgForm) {
    if (saleForm.valid) {
      this.salesControllerService.createSale({
        articles: this.selectedArticles.map(a => ({articleId: a.article.id, quantity: a.quantity})),
        total: this.totalAmount
      });
      this.closeModal();
    }
  }

  addArticle(article: ArticleDropdown) {
    const existing = this.selectedArticles.find(a => a.article.id === article.id);
    if (existing) {
      if (existing.quantity < article.inventory.currentStock) {
        existing.quantity++;
      }
    } else {
      if (article.inventory.currentStock > 0) {
        this.selectedArticles.push({article, quantity: 1});
      }
    }
    this.calculateTotalAmount();
  }

  removeArticle(article: ArticleDropdown) {
    const existing = this.selectedArticles.find(a => a.article.id === article.id);
    if (existing) {
      existing.quantity--;
      if (existing.quantity === 0) {
        this.selectedArticles = this.selectedArticles.filter(a => a.article.id !== article.id);
      }
    }
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.selectedArticles.reduce((total, item) => total + item.article.price * item.quantity, 0);
  }

  getQuantity(article: ArticleDropdown): number {
    const selected = this.selectedArticles.find(a => a.article.id === article.id);
    return selected ? selected.quantity : 0;
  }

  getTotalPrice(article: ArticleDropdown): number {
    const selected = this.selectedArticles.find(a => a.article.id === article.id);
    return selected ? selected.article.price * selected.quantity : 0;
  }

  addArticle10(article: ArticleDropdown) {
    for (let i = 0; i < 10; i++) {
      this.addArticle(article);
    }
  }
}
