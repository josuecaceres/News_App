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

  getTopHeadlines() :Observable<Article[]>{
    return this._http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=technology`, {
      params: {apikey: apikey}
    }).pipe(
      map( ({ articles }) => articles)
    )
  }
}
