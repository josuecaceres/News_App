import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';

import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonContent) content!:IonContent
  scroll:boolean = false

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  public categories: string[] = ['general', 'business','entertainment','health','science','sports','technology']
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor(private _newServ:NewsService) {}

  ngOnInit(){
    this._newServ.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [ ...articles ]
      })
  }

  segmentChanged(event:Event){
    this.selectedCategory = (event as CustomEvent).detail.value
    this._newServ.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [ ...articles ]
    })
  }

  loadData() {
    this._newServ.getTopHeadlinesByCategory(this.selectedCategory, true)
      .subscribe(articles => {
        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        this.articles = articles;
        this.infiniteScroll.complete();
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
