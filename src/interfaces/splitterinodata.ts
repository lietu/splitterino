import {ICategory, ICategoryDefinition} from "./category";

export interface ISplitterinoData {
  categories: ICategory[];
  load(): void;
  save(): void;
  addCategory(definition: ICategoryDefinition): void;
  removeCategory(category: ICategory): void;
  getCategory(name: String): ICategory;
}
