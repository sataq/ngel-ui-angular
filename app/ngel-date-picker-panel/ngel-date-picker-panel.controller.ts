import * as moment from "moment";

export class NgelDatePickerPanelController {

    selectedDate: Date;
    refresh;
    message: string;
    minDate: Date;
    maxDate: Date;

    /* @ngInject */
    constructor() {}

    $onInit() {
        this.message = `Valid dates are between ${moment(this.minDate).format("YYYY-MM-DD")} and ${moment(this.maxDate).format("YYYY-MM-DD")}`;
    }

    callRefresh() {
        this.refresh();
    }
}