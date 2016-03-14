import {Category} from './category';

export class SplitterinoData {
  categories: Category[];

  constructor() {
    console.log("New SplitterinoData");
    this.categories = [];
  }

  public load() {
    console.log("Loading categories");
    this.categories.push(new Category("GeoGuessr"));
    this.categories.push(new Category("Nuclear Throne"));
    this.categories.push(new Category("Nuclear Throne - Captain"));
    this.categories.push(new Category("Binding of Isaac Real Platinum God"));
  }

  public getCategory(name) {
    for (let i = 0, count = this.categories.length; i < count; i += 1) {
      if (this.categories[i].name === name) {
        return this.categories[i]
      }
    }

    return undefined;
  }
}
