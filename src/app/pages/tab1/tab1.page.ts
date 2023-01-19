import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';

import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonContent) content!:IonContent
  scroll:boolean = false

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;
  public articles:Article[] = []

  constructor(private _newsServ:NewsService) {}

  ngOnInit(): void {
    this._newsServ.getTopHeadlines()
      .subscribe(articles => {
        this.articles.push(...articles)
      })
  }

  loadData(){
    this._newsServ.getTopHeadlinesByCategory('general', true)
      .subscribe(articles => {
        if(articles.length === this.articles.length){
          this.infiniteScroll.disabled = true
          return
        }

        this.articles = articles
        this.infiniteScroll.complete()
      })
  }

  //Funciones para el boton de arriba
  Scroll(e:any){
    if(e.detail.scrollTop > 250){
      this.scroll = true
    }else{
      this.scroll = false
    }
  }

  top(){
    this.content.scrollToTop(1000)
  }
}
