import {ISplitterinoData} from '../interfaces/splitterinodata';
import {ICategory, ICategoryDefinition} from '../interfaces/category';

class FakeData implements ISplitterinoData {
  categories: ICategory[];

  load(): void {

  }

  save(): void {

  }

  addCategory(definition: ICategoryDefinition): void {

  }

  removeCategory(category: ICategory): void {

  }

  getCategory(name: String): ICategory {
    return undefined;
  }
}

export class Splitterino {
  data: ISplitterinoData;
  activeCategory: ICategory;

  constructor() {
    this.data = new FakeData();
  }

  public setActiveCategory(category: ICategory) {
    this.activeCategory = category;
  }

  public getActiveCategory(): ICategory {
    return this.activeCategory;
  }

  public setData(data: ISplitterinoData) {
    this.data = data;
  }
}

let splitterino = new Splitterino();

(<any>window).splitterino = splitterino;

export {
  splitterino
}
