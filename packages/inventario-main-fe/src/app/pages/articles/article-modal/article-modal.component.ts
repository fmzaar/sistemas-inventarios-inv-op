import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Article} from '../../../domain/articles/articles.model';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  @Input() article: Article;
  @Input() isEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Article>();
  inventories: { key: string, name: string }[] = [
    {key: 'LOTE_FIJO', name: 'Lote fijo'},
    {key: 'INTERVALO_FIJO', name: 'Intervalo fijo'}
  ];

  closeModal() {
    this.close.emit();
  }

  saveArticle(articleForm: NgForm) {
    if (articleForm.valid) {
      this.save.emit(this.article);
      this.closeModal();
    }
  }
}
