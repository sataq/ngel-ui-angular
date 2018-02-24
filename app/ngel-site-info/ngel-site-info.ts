import * as angular from "angular";
import {NgelSiteInfoController} from "./ngel-site-info.controller";
const templateUrl = require("./ngel-site-info.html");

export const ngelSiteInfo: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelSiteInfoController,
    controllerAs: "vm",
    bindToController: true,
    scope: {
        drawerName: "@"
    }
};
