import * as angular from "angular";
import {NgelMapController} from "./ngel-map.controller";
const templateUrl = require("./ngel-map.html");

export const ngelMap: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelMapController,
    controllerAs: "vm",
    bindToController: true,
    scope: {
        stations: "=?",
        selectedDate: "=?",
        refreshMap: "&?"
    }
};
