export interface SplitDefinition {
  name: String;
}

export class Split {
  name: String;
  wr: String;
  pb: String;

  constructor(definition: SplitDefinition) {
    this.name = definition.name;
    this.wr = "00:00:00";
    this.pb = "00:00:00";
  }
}
