import {inject} from 'aurelia-framework';
import {splitterino, Splitterino} from '../services/splitterino';
import {Category} from '../models/category';


export class Categories {
  heading = 'Categories';
  splitterino: Splitterino;
  categories: Category[];
  category: Category;

  construct() {
    this.category = undefined;
  }

  activate(params) {
    console.log("Activate");
    console.dir(params);
    this.category = splitterino.data.getCategory(params.name);
  }
}
