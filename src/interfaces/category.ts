import {ISplit, ISplitDefinition} from "./split";

export interface ICategoryDefinition {
  name: string;
  splits: ISplitDefinition[];
}

export interface ICategory {
  name: string;
  splits: ISplit[];
  addSplit(split: ISplitDefinition): void;
  removeSplit(split: ISplit): void;
}
