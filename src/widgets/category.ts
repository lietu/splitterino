import {inject} from 'aurelia-framework';
import {splitterino, Splitterino} from '../services/splitterino';
import {ICategory} from '../interfaces/category';
import {Category} from '../models/category';
import {Split} from "../models/split";
import {Message} from "../services/messages";
import {confirmer} from "../services/confirmer";
import {Router} from 'aurelia-router';

@inject(Router)
export class Categories {
  heading = 'Categories';
  categories: Category[];
  category: ICategory;
  router: Router;

  hasError: boolean;
  splitName: string;

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

  runCategory() {
    splitterino.setActiveCategory(this.category);
    this.router.navigate("timer");
  }

  removeCategory() {
    let promise = confirmer.ask(`Do you want to delete category "${this.category.name}"?`);

    promise.then(function () {
        new Message(`Category "${this.category.name}" deleted.`);
        splitterino.data.removeCategory(this.category);
        this.router.navigate("categories");
      }.bind(this),
      function () {
        // Do nothing on "no"
      });
  }

  clearError(e) {
    let skip = [13];
    if (skip.indexOf(e.keyCode) === -1) {
      this.hasError = false;
    }

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
      this.category.addSplit({name: this.splitName, targetTime: "00:00:00.000"});
    } catch (e) {
      new Message(e.message, "danger");
      this.hasError = true;
      return;
    }

    new Message(`Added split "${this.splitName}"`, 'success', 1500);

    this.splitName = "";

    setTimeout(function () {
      document.querySelector(".page-host").scrollTop = 9999999999999999;
    }, 20);
  }

}
