import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ArticlesApiService} from './articles-api.service';
import * as ArticlesActions from './articles.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';

@Injectable()
export class ArticlesEffects {

  article$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      switchMap(() =>
        this.articlesApiService.getArticles().pipe(
          map(data => ArticlesActions.loadArticlesSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ArticlesActions.loadArticlesFailure({error}));
          })
        )
      )
    )
  );

  findArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.findArticle),
      switchMap(({id}) =>
        this.articlesApiService.getArticle(id).pipe(
          map(data => ArticlesActions.findArticleSuccess({article: data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ArticlesActions.findArticleFailure({error}));
          })
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.updateArticle),
      switchMap(({article}) =>
        this.articlesApiService.updateArticle(article.id, article).pipe(
          map(data => ArticlesActions.updateArticleSuccess({article: data}) && ArticlesActions.loadArticles()),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ArticlesActions.updateArticleFailure({error}));
          })
        )
      )
    )
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.createArticle),
      switchMap(({article}) =>
        this.articlesApiService.checkCode(article.code).pipe(
          switchMap((exists) => {
            if (exists) {
              return this.sweetalertService.showSimpleErrorAlert({
                error: '',
                message: 'Codigo ingresado ya existe',
                statusCode: 0
              });
            }
            return this.articlesApiService.createArticle(article).pipe(
              map(data => ArticlesActions.createArticleSuccess({article: data}) && ArticlesActions.loadArticles()),
              catchError(({error}) => {
                this.sweetalertService.showSimpleErrorAlert(error);
                return of(ArticlesActions.createArticleFailure({error}));
              })
            );
          })
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.deleteArticle),
      switchMap(({id}) =>
        this.articlesApiService.deleteArticle(id).pipe(
          map(() => ArticlesActions.deleteArticleSuccess({id}) && ArticlesActions.loadArticles()),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ArticlesActions.deleteArticleFailure({error}));
          })
        )
      )
    )
  );

  saveInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.configInventory),
      switchMap(({inventory}) =>
        this.articlesApiService.saveInventory(inventory).pipe(
          map(() => ArticlesActions.configInventorySuccess({inventory}) && ArticlesActions.loadArticles()),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ArticlesActions.configInventoryFailure({error}));
          })
        )
      )
    )
  );


  constructor(private actions$: Actions,
              private articlesApiService: ArticlesApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
