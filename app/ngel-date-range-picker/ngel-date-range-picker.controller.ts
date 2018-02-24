import * as moment from "moment";

export class NgelDateRangePickerController {

    minDate: Date;
    maxDate: Date;

    /* @ngInject */
    constructor() {}

    getMessage() {
        return `Valid dates are between ${moment(this.minDate).format("YYYY-MM-DD")} and ${moment(this.maxDate).format("YYYY-MM-DD")}`;
    }
}
