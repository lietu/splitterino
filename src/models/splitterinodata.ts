import {ISplitterinoData} from "../interfaces/splitterinodata";
import {ICategory, ICategoryDefinition} from '../interfaces/category';
import {Category} from './category';

let DEFAULT_DATA = {
  "categories": [{
    "name": "GeoGuessr",
    "splits": [{"name": "Done", "targetTime": "00:00:00.000"}]
  }, {
    "name": "Nuclear Throne",
    "splits": [{"name": "Done", "targetTime": "00:00:00.000"}]
  }, {
    "name": "Nuclear Throne - Captain",
    "splits": [{"name": "Done", "targetTime": "00:00:00.000"}]
  }, {
    "name": "Binding of Isaac Real Platinum God",
    "splits": [{"name": "Done", "targetTime": "00:00:00.000"}]
  }]
};

export class SplitterinoData implements ISplitterinoData {
  categories: ICategory[];
  saveTimeout: number;
  loading: boolean;

  constructor() {
    console.log("New SplitterinoData");
    this.categories = [];
  }

  public load() {
    console.log("Loading data");
    let data = localStorage.getItem("data");

    if (!data) {
      console.log("No existing data, using default");
      data = DEFAULT_DATA;
    } else {
      data = JSON.parse(data);
    }

    console.dir(data);

    this.loading = true;
    data.categories.forEach(function (category) {
      this.addCategory(category);
    }.bind(this));

    this.loading = false;
    this.sortCategories();
  }

  public save() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(this.saveReal.bind(this), 50);
  }

  public addCategory(definition: ICategoryDefinition) {
    if (this.getCategory(definition.name) !== undefined) {
      throw new Error(`Category "${definition.name}" already exists.`);
    }

    this.categories.push(new Category(definition));
    this.save();

    this.sortCategories();
  }

  public removeCategory(category: ICategory) {
    for (let i = 0, count = this.categories.length; i < count; i += 1) {
      if (this.categories[i] === category) {
        this.categories.splice(i, 1);
        return;
      }
    }
    this.save();
  }

  public getCategory(name: String) {
    for (let i = 0, count = this.categories.length; i < count; i += 1) {
      if (this.categories[i].name === name) {
        return this.categories[i]
      }
    }

    return undefined;
  }

  private sortCategories() {
    if (this.loading) {
      return;
    }

    console.log("Sorting categories");
    this.categories.sort(function (left, right) {
      let leftName = left.name.toLowerCase();
      let rightName = right.name.toLowerCase();

      if (leftName < rightName) {
        return -1;
      } else if (leftName > rightName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private saveReal() {
    console.log("Saving data");
    let data = JSON.stringify(this);
    console.dir(JSON.parse(data));
    localStorage.setItem("data", data);
  }
}
