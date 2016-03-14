//import Aureliarouter = require("aurelia-router");
import {Router, RouterConfiguration} from "aurelia-router";
/*import RouterConfiguration = Aureliarouter.RouterConfiguration;
import Router = Aureliarouter.Router;
*/
export class App {
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Splitterino';
        config.map([
            { route: ['', 'categories'], name: 'categories', moduleId: 'widgets/categories', nav: true, title: 'Categories' },
            { route: ['category/:name'], name: 'category', moduleId: 'widgets/category', nav: false, title: 'Category' },
        ]);

        this.router = router;
    }
}
