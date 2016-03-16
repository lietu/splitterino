import {inject} from 'aurelia-framework';
import {splitterino, Splitterino} from '../services/splitterino';
import {ICategory} from '../interfaces/category';
import {Message} from '../services/messages';


@inject(splitterino)
export class Categories {
  splitterino: Splitterino;
  categories: ICategory[];
  hasError: Boolean;
  categoryName: string;

  constructor(splitterino) {
    this.splitterino = splitterino;
    this.categoryName = "";
    this.hasError = false;
  }

  public activate() {
    console.log("Activate");
    this.categories = splitterino.data.categories;
    console.dir(this);
  }

  public clearError(e) {
    let skip = [13];
    if (skip.indexOf(e.keyCode) === -1) {
      this.hasError = false;
    }

    return true;
  }

  public addCategory() {
    console.log("Add category: " + this.categoryName);

    if (!this.categoryName) {
      this.hasError = true;
      new Message("Please give the category a name", "danger");
      return;
    }

    this.hasError = false;

    try {
      splitterino.data.addCategory({name: this.categoryName, splits: [{"name": "Done", targetTime: "00:00:00.000"}]});
    } catch(e) {
      new Message(e.message, "danger");
      this.hasError = true;
      return;
    }

    new Message(`Added category "${this.categoryName}"`, 'success', 1500);

    this.categoryName = "";

    setTimeout(function() {
      document.querySelector(".page-host").scrollTop = 9999999999999999;
    }, 20);
  }
}
