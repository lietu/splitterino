import {ICategory, ICategoryDefinition} from "../interfaces/category";
import {ISplit, ISplitDefinition} from "../interfaces/split";
import {Split} from "./split";
import {splitterino} from '../services/splitterino';

export class Category implements ICategory {
  name: string;
  splits: ISplit[];
  creating: boolean;

  constructor(definition: ICategoryDefinition) {
    this.name = definition.name;
    this.creating = true;

    this.splits = [];

    definition.splits.forEach(function (split) {
      this.addSplit(split);
    }.bind(this));

    this.creating = false;
  }

  addSplit(split: ISplitDefinition) {
    console.log(`Adding split to category "${this.name}"`);
    console.dir(split);

    this.splits.forEach(function (item) {
      if (item.name === split.name) {
        throw new Error(`Split "${split.name}" already exists`);
      }
    });

    // Do the bananasplit
    this.splits.push(new Split(split));

    if (!this.creating) {
      splitterino.data.save();
    }
  }

  removeSplit(split: ISplit) {
    console.log(`Removing split from category "${this.name}"`);
    console.dir(split);

    for (let i = 0, count = this.splits.length; i < count; i += 1) {
      if (this.splits[i] === split) {
        this.splits.splice(i, 1);
        break;
      }
    }

    splitterino.data.save();
  }
}
