import {Category, CategoryDefinition} from './category';

export class SplitterinoData {
  categories: Category[];

  constructor() {
    console.log("New SplitterinoData");
    this.categories = [];
  }

  public load() {
    console.log("Loading categories");
    this.addCategory({name: "GeoGuessr", splits: [{name: "Done"}]});
    this.addCategory({name: "Nuclear Throne", splits: [{name: "Done"}]});
    this.addCategory({
      name: "Nuclear Throne - Captain",
      splits: [{name: "Done"}]
    });
    this.addCategory({
      name: "Binding of Isaac Real Platinum God",
      splits: [{name: "Done"}]
    });
  }

  public addCategory(definition: CategoryDefinition) {
    if (this.getCategory(definition.name) !== undefined) {
      throw new Error(`Category "${definition.name}" already exists.`);
    }

    this.categories.push(new Category(definition));
  }

  public removeCategory(category: Category) {
    for (let i = 0, count = this.categories.length; i < count; i += 1) {
      if (this.categories[i] === category) {
        this.categories.splice(i, 1);
        return;
      }
    }
  }

  public getCategory(name: String) {
    for (let i = 0, count = this.categories.length; i < count; i += 1) {
      if (this.categories[i].name === name) {
        return this.categories[i]
      }
    }

    return undefined;
  }
}
