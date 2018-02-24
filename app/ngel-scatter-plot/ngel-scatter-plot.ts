import * as angular from "angular";
import {NgelScatterPlotController} from "./ngel-scatter-plot.controller";
const templateUrl = require("./ngel-scatter-plot.html");

export const ngelScatterPlot: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelScatterPlotController,
    controllerAs: "vm",
    bindToController: true,
    scope: {}
};
