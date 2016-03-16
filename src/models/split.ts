import {ISplit, ISplitDefinition} from "../interfaces/split";

export class Split {
  name: string;
  targetTime: string;

  constructor(definition: ISplitDefinition) {
    this.name = definition.name;
    this.targetTime = definition.targetTime;
  }
}
