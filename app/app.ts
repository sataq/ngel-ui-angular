import * as angular from "angular";
import {initRoutes} from "./app-routes/app.routes";
import {initComponents} from "./app.components";
import {initServices} from "./app.services";
import {initConfig} from "./app.config";

/* tslint:disable:no-string-literal */
window["ngRoute"] = "ngRoute"; // To map angular-route via Webpack externals
window["ngAria"] = "ngAria"; // To map angular-aria via Webpack externals
import "angular-aria";
import * as ngRoute from "angular-route";
import "ngMap";
import "angularjs-datepicker";

require("./app.scss");

const app = angular.module("App", [ngRoute, "ngAria", "ngMap", "720kb.datepicker"]);

// Initialize Angular constants based on app-config.json
// CONFIG is injected at compile-time by webpack.DefinePlugin
declare const CONFIG: Object;
Object.keys(CONFIG).forEach(key => app.constant(key, CONFIG[key]));

initRoutes(app);
initComponents(app);
initServices(app);
initConfig(app);

google.load("visualization", "1", {packages:["corechart"]});

export default app;
export const ng = angular;
