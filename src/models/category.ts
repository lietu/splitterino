import {Split, SplitDefinition} from "./split";

export interface CategoryDefinition {
  name: String;
  splits: SplitDefinition[];
}

export class Category {
  name: String;
  splits: Split[];

  constructor(definition: CategoryDefinition) {
    this.name = definition.name;

    this.splits = [];

    definition.splits.forEach(function (split) {
      this.addSplit(split);
    }.bind(this));
  }

  addSplit(split: SplitDefinition) {
    this.splits.forEach(function(item) {
      if (item.name === split.name) {
        throw new Error(`Split "${split.name}" already exists`);
      }
    });

    // Do the bananasplit
    this.splits.push(new Split(split));
  }

  removeSplit(split: Split) {
    for (let i = 0, count = this.splits.length; i < count; i += 1) {
      if (this.splits[i] === split) {
        this.splits.splice(i, 1);
        return;
      }
    }
  }
}
