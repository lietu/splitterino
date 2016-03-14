import {inject} from 'aurelia-framework';
import {splitterino, Splitterino} from '../services/splitterino';
import {Category} from '../models/category';


@inject(splitterino)
export class Categories {
  heading = 'Categories';
  splitterino: Splitterino;
  categories: Category[];

  construct(splitterino) {
    this.splitterino = splitterino;
  }

  activate() {
    console.log("Activate");
    this.categories = splitterino.data.categories;
    console.dir(this);
  }
}
