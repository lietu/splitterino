import {inject} from 'aurelia-framework';
import {SplitterinoData} from '../models/splitterinodata';

export class Splitterino {
  data: SplitterinoData;

  constructor() {
    this.data = new SplitterinoData();
    this.data.load();
  }
}

let splitterino = new Splitterino();

(<any>window).splitterino = splitterino;

export {
  splitterino
}
