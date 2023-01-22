import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null | any= null;
  private _localArticles: Article[] = [];

  get getLocalArticles() {
    return [ ...this._localArticles ]
  }

  constructor(private storage: Storage, public toastController: ToastController,) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  async saveRemoveArticle(article: Article) {
    const exists = this._localArticles.find(localArticle => localArticle.title === article.title);
    if (exists) {
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title);
      this.presentToast('Eliminado de favoritos.')
    } else {
      this._localArticles = [article, ...this._localArticles];
      this.presentToast('Agragado a favoritos.')
    }
    this._storage.set('articles', this._localArticles);
  }

  async loadFavorites() {
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];
    } catch (error) {
      console.log(error)
    }
  }

  articleInFavorites( article: Article ) {
    return !!this._localArticles.find( localArticle => localArticle.title === article.title );
  }

  async presentToast(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
      duration: 2000,
			position: "bottom",
			cssClass: "tabs-bottom",
			mode: 'md'
		});
		toast.present();
	}

}
