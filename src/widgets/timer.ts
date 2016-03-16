import {splitterino, Splitterino} from '../services/splitterino';
import {ICategory} from "../interfaces/category";
import {Category} from "../models/category";


interface TimerData {
  hours: number,
  minutes: number,
  seconds: number,
  millis: number
}


let TIMER_CONFIG: TimerData = {
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
  millis: 1
};

let DEFAULT_CATEGORY = {
  name: "No category",
  splits: [
    {name: "Done", targetTime: "00:00:00.000"},
    {name: "Done2", targetTime: "00:00:00.000"},
    {name: "Done3", targetTime: "00:00:00.000"},
    {name: "Done4", targetTime: "00:00:00.000"},
    {name: "Done5", targetTime: "00:00:00.000"},
  ]
};


class SplitTimer {
  name: string;
  currentTime: string;
  diffTime: string;
  targetTime: string;
  status: string;
}


export class Timer {
  category: ICategory;
  categoryName: string;
  currentTime: string;

  running: boolean;
  late: boolean;

  startTime: Date;
  splitTime: Date;
  endTime: Date;

  currentSplit: number;
  splitTimers: SplitTimer[];

  updateInterval: number;

  constructor() {
    this.running = false;
    this.late = false;
  }

  public activate() {
    console.log("Activate");
    let category = splitterino.getActiveCategory();

    if (!category) {
      category = new Category(DEFAULT_CATEGORY);
    }

    if (category !== this.category) {
      this.category = category;
      this.categoryName = category.name;
      this.reset();
    }
  }

  public start() {
    if (this.running) {
      return;
    }

    console.log("Starting timer");

    this.running = true;
    this.startTime = new Date();
    this.splitTime = this.startTime;

    this.reset();

    let split = this.getCurrentSplitTimer();
    split.status = "running";

    this.updateInterval = setInterval(this.updateCurrentTimes.bind(this), 1);
  }

  public reset() {
    this.late = false;
    this.endTime = undefined;
    this.startTime = new Date();
    this.splitTime = this.startTime;

    this.currentSplit = 0;
    this.splitTimers = [];

    this.category.splits.forEach(function(split) {
      let splitTimer = new SplitTimer();
      splitTimer.name = split.name;
      splitTimer.currentTime = "";
      splitTimer.diffTime = "";
      splitTimer.targetTime = split.targetTime;
      splitTimer.status = "none";
      this.splitTimers.push(splitTimer);
    }.bind(this));

    this.currentTime = "00:00:00.000";
  }

  public updateCurrentTimes() {
    if (!this.startTime) {
      this.currentTime = "00:00:00.000";
    } else if (!this.endTime) {
      this.currentTime = this.getElapsedTime(this.startTime);
    } else {
      this.currentTime = this.getElapsedTime(this.startTime, this.endTime);
    }

    let diffTime = this.getDiffTime(this.currentTime, this.getLastSplitTimer().targetTime);
    if (diffTime[0] !== "-") {
      this.late = true;
    }

    let split = this.getCurrentSplitTimer();
    split.currentTime = this.getElapsedTime(this.splitTime);
    split.diffTime = this.getDiffTime(this.currentTime, split.targetTime);
    if (split.diffTime[0] !== "-") {
      split.status = "running-late";
    }
  }

  public stop() {
    if (this.running) {
      console.log("Stopping timer");
      clearInterval(this.updateInterval);
      this.running = false;
      this.endTime = new Date();
    }
  }

  public split() {
    console.log("Timer split");

    let split = this.getCurrentSplitTimer();
    split.currentTime = this.getElapsedTime(this.splitTime);

    if (split.status === "running") {
      split.status = "done";
    } else {
      split.status = "done-late";
    }

    this.currentSplit += 1;
    if (this.currentSplit >= this.splitTimers.length) {
      console.log("Ran out of splits");
      this.stop();
    } else {
      split = this.getCurrentSplitTimer();
      split.status = "running";
    }
  }

  private getCurrentSplitTimer(): SplitTimer {
    return this.splitTimers[this.currentSplit];
  }

  private getLastSplitTimer(): SplitTimer {
    return this.splitTimers[this.splitTimers.length - 1];
  }

  public getElapsedTime(startTime: Date, endTime: Date = undefined): string {
    if (!endTime) {
      endTime = new Date();
    }

    let elapsedMillis = endTime.getTime() - startTime.getTime();

    return this.formatElapsedMillis(elapsedMillis);
  }

  private formatElapsedMillis(elapsedMillis) {
    let sign = "";

    if (elapsedMillis < 0) {
      sign = "-";
      elapsedMillis = Math.abs(elapsedMillis);
    }

    let data: TimerData = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      millis: 0
    };

    for (var key in TIMER_CONFIG) {
      let divider = TIMER_CONFIG[key];
      let count = Math.floor(elapsedMillis / divider);
      elapsedMillis -= count * divider;
      data[key] = count;
    }

    return `${sign}${this.prefix(data.hours)}:${this.prefix(data.minutes)}:${this.prefix(data.seconds)}.${this.prefix(data.millis, 3)}`;
  }

  private getDiffTime(fromString, toString) {
    let from = this.toMillis(fromString);
    let to = this.toMillis(toString);

    let diff = from - to;

    return this.formatElapsedMillis(diff);
  }

  private toMillis(timeString) {
    let parts = /^(\d{2,}):(\d{2}):(\d{2,}).(\d{3})$/.exec(timeString);

    let sum = 0;
    sum += TIMER_CONFIG.hours * Number(parts[1]);
    sum += TIMER_CONFIG.minutes * Number(parts[2]);
    sum += TIMER_CONFIG.seconds * Number(parts[3]);
    sum += TIMER_CONFIG.millis * Number(parts[4]);

    return sum;
  }

  private prefix(count: number, length: number = 2): string {
    let result = String(count);

    while (result.length < length) {
      result = '0' + result;
    }

    return result;
  }

}
