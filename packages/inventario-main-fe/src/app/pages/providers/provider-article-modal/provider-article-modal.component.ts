import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProvidersControllerService} from '../../../domain/providers/providers-controller.service';
import {ArticlesControllerService} from '../../../domain/articles/articles-controller.service';
import {Article} from '../../../domain/articles/articles.model';

interface ArticleProviderData extends Article {
  purchasePrice: number;
  priority: number;
  daysDelay: number;
}

@Component({
  selector: 'app-provider-article-modal',
  templateUrl: './provider-article-modal.component.html',
  styleUrls: ['./provider-article-modal.component.scss']
})
export class ProviderArticleModalComponent implements OnInit {
  @Input() provider: any;
  @Output() close = new EventEmitter<void>();
  articles: ArticleProviderData[] = [];

  constructor(private providerControllerService: ProvidersControllerService, private articleControllerService: ArticlesControllerService) {
    this.articleControllerService.articles$.subscribe(articles => {
      if (articles) {
        this.articles = articles.map(article => ({
          ...article,
          purchasePrice: 0,
          priority: 0,
          daysDelay: 0
        }));
      }
    });
    this.providerControllerService.providerArticle$.subscribe(providerArticles => {
      if (providerArticles) {
        if (this.articles.length > 0) {
          this.articles.forEach(article => {
            const found = providerArticles.find(ap => ap.articleId === article.id);
            if (found) {
              article.purchasePrice = found.purchasePrice;
              article.priority = found.priority;
              article.daysDelay = found.daysDelay;
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.articleControllerService.loadArticles();
    this.providerControllerService.getArticleProviders(this.provider.id);
  }

  saveArticleProvider(form: NgForm) {
    const articleProviders = this.articles.map(article => ({
      articleId: article.id,
      providerId: this.provider.id,
      purchasePrice: article.purchasePrice,
      priority: article.priority,
      daysDelay: article.daysDelay
    }));
    if (articleProviders.find(ap => ap.purchasePrice < 0 || ap.priority < 0)) {
      alert('El precio de compra y la prioridad deben ser mayores a 0');
      return
    }
    if (articleProviders.find(ap => ap.priority > 100)) {
      alert('La prioridad no puede ser mayor a 100');
      return;
    }
    if (articleProviders.find(ap => ap.daysDelay < 0)) {
      alert('Los días de demora deben ser mayores a 0');
      return;
    }
    this.providerControllerService.createOrUpdateArticleProvider(articleProviders);
    this.closeModal();

  }

  closeModal() {
    this.close.emit();
  }
}
