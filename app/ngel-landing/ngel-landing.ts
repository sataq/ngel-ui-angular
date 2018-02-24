import * as angular from "angular";
import {NgelLandingController} from "./ngel-landing.controller";
const templateUrl = require("./ngel-landing.html");

export const ngelLanding: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelLandingController,
    controllerAs: "vm",
    bindToController: true,
    scope: {}
};