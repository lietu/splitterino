import {inject} from 'aurelia-framework';
import {splitterino, Splitterino} from '../services/splitterino';
import {Category} from '../models/category';
import {Split} from "../models/split";
import {Message} from "../services/messages";
import {Router} from 'aurelia-router';

@inject(Router)
export class Categories {
  heading = 'Categories';
  categories: Category[];
  category: Category;
  router: Router;

  hasError: boolean;
  splitName: String;

  constructor(router) {
    this.router = router;
    this.category = undefined;
    this.splitName = "";
    this.hasError = false;
  }

  activate(params, routeConfig, navigationInstruction) {
    console.log("Activate category");
    console.dir(params);
    this.category = splitterino.data.getCategory(params.name);

    if (!this.category) {

      return false;
    }

    routeConfig.navModel.title = `Category - ${this.category.name}`;
  }

  removeCategory() {
    splitterino.data.removeCategory(this.category);
    this.router.navigate("categories");
  }

  clearError(event) {
    return true;
  }

  addSplit() {
    console.log("Add split: " + this.splitName);

    if (!this.splitName) {
      this.hasError = true;
      new Message("Please give the split a name", "danger");
      return;
    }

    this.hasError = false;

    try {
      this.category.addSplit({name: this.splitName});
    } catch(e) {
      new Message(e.message, "danger");
      this.hasError = true;
      return;
    }

    new Message(`Added split "${this.splitName}"`, 'success', 1500);

    this.splitName = "";

    setTimeout(function() {
      document.querySelector(".page-host").scrollTop = 9999999999999999;
    }, 20);
  }

}
