import * as angular from "angular";
import {NgelDatePickerPanelController} from "./ngel-date-picker-panel.controller";
const templateUrl = require("./ngel-date-picker-panel.html");

export const ngelDatePickerPanel: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelDatePickerPanelController,
    controllerAs: "vm",
    bindToController: true,
    scope: {
        selectedDate: "=",
        refresh: "&",
        maxDate: "@",
        minDate: "@"
    }
};
