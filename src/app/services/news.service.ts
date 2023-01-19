import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces';

const apikey = environment.apikey
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articlesByCategoryAndPage:ArticlesByCategoryAndPage = {};

  constructor(private _http:HttpClient) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this._http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apikey,
        country: 'us'
      }
    })
  }

  getTopHeadlines() :Observable<Article[]>{
    return this.getTopHeadlinesByCategory('general');
  }

  getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]>{
    if(loadMore){
      return this.getArticlesByCategiry(category)
    }

    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category].articles)
    }

    return this.getArticlesByCategiry(category)
  }

  private getArticlesByCategiry(category:string):Observable<Article[]>{
    if(!Object.keys(this.articlesByCategoryAndPage).includes(category)){
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
      .pipe(
        map(({articles}) => {
          if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles;

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
          }

          return this.articlesByCategoryAndPage[category].articles
        })
      )
  }
}
