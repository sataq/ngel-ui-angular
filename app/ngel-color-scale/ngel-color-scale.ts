import * as angular from "angular";
import {NgelColorScaleController} from "./ngel-color-scale.controller";
const templateUrl = require("./ngel-color-scale.html");

export const ngelColorScale: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelColorScaleController,
    controllerAs: "vm",
    bindToController: true,
    scope: {}
};
