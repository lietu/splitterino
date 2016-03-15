import {Router, RouterConfiguration} from "aurelia-router";
import {messageManager, Message} from "./services/messages";

export class App {
  router: Router;
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
    ]);

    this.router = router;

    this.messages = messageManager.messages;
  }
}
