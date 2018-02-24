import * as angular from "angular";
import {NgelDateRangePickerController} from "./ngel-date-range-picker.controller";
const templateUrl = require("./ngel-date-range-picker.html");

export const ngelDateRangePicker: angular.IDirective = {
    templateUrl: templateUrl,
    controller: NgelDateRangePickerController,
    controllerAs: "vm",
    bindToController: true,
    scope: {
        startDate: "=",
        endDate: "=",
        maxDate: "@",
        minDate: "@"
    }
};
