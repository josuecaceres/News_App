import { Component, OnInit } from '@angular/core';
import { resolveMx } from 'dns';
import { NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private _newsServ:NewsService) {}

  ngOnInit(): void {
/*     this._newsServ.getTopHeadlines()
      .subscribe(articles => {
        console.log(articles)
      }) */
  }
}