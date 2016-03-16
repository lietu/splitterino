import {Router, RouterConfiguration} from "aurelia-router";
import {messageManager, Message} from "./services/messages";
import {confirmer, Confirmer} from './services/confirmer';
import {splitterino} from './services/splitterino';
import {SplitterinoData} from './models/splitterinodata';

export class App {
  router: Router;
  confirmer: Confirmer;
  messages: Message[];

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Splitterino';
    config.map([
      {
        route: ['', 'categories'],
        name: 'categories',
        moduleId: 'widgets/categories',
        nav: true,
        title: 'Categories'
      },
      {
        route: ['category/:name'],
        name: 'category',
        moduleId: 'widgets/category',
        nav: false,
        title: 'Category'
      },
      {
        route: ['timer'],
        name: 'timer',
        moduleId: 'widgets/timer',
        nav: true,
        title: 'Timer'
      },
    ]);

    this.router = router;
    this.confirmer = confirmer;
    this.messages = messageManager.messages;
  }
}

let data = new SplitterinoData();
splitterino.setData(data);
data.load();
