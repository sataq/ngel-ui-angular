import * as angular from "angular";
import { StationWithIcon, StationDailyDataCollection } from "../models/station.model";
import { StationsService } from "../services/station-daily-data/station-daily-data.service";
import moment = require('moment');

const ERROR_MSGS = {
    startDate: "Invalid start date.",
    endDate: "Invalid end date.",
    startMoreThanEnd: "Start Date is after End Date.",
    moreThan60Days: "Date range exceeds permissible max range of 60 days."
};

const MAX_DAY_RANGE = 60;

export class NgelSiteInfoController {

    drawerName: string;
    station: StationWithIcon;
    isOpen = false;
    private hasBeenClosed = false;
    chartOptions = {};
    dataTable: google.visualization.DataTable;
    startDate: Date;
    endDate: Date;
    maxOccurred: Date;
    minOccurred: Date;
    errorMsg: string;
    validData: boolean = true;

    /* @ngInject */
    constructor(private $element:angular.IAugmentedJQuery,
        private $rootScope:angular.IRootScopeService,
        private stationsService: StationsService
    ) {}

    $onInit() {
        this.$rootScope.$on(`openSiteInfo`, (_event, name, station) => {
            if (name !== this.drawerName) { return; }
            this.openSiteInfo(station);
        });

        this.$rootScope.$on(`closeSiteInfo`, (_event, name) => {
            if (name !== this.drawerName) { return; }

            this.closeSiteInfo();
        });
    }

    openSiteInfo(station: StationWithIcon) {
        this.station = station;
        this.isOpen = true;
        this.loadStationDailyData(station.ngelId);
    }

    closeOnDirectClick(event:Event) {
        if (event.target === this.$element[0].firstChild) {
            this.closeSiteInfo();
        }
    }

    closeSiteInfo() {
        this.isOpen = false;
        this.hasBeenClosed = true;
    }

    wasActivelyClosed() {
        return this.isOpen === false && this.hasBeenClosed;
    }

    loadStationDailyData(ngelId: string) {
        this.stationsService.getStationDailyData(ngelId).then(this.populateScatterPlot);
    }

    showScatterPlot() {
        return this.dataTable.getNumberOfRows() > 0;
    }

    refreshScatterPlot() {
        this.errorMsg = undefined;
        if(this.validStartAndEndDate()) {
            this.stationsService.getStationDailyData(this.station.ngelId, moment(this.startDate).valueOf(), moment(this.endDate).valueOf())
                .then(this.populateScatterPlot);
        }
    }

    validStartAndEndDate() {
        if (!this.startDate) {
            this.errorMsg = ERROR_MSGS.startDate;
        } else if (!this.endDate) {
            this.errorMsg = ERROR_MSGS.endDate;
        }

        if (!this.errorMsg) {
            const startDt = moment(this.startDate);
            const endDt = moment(this.endDate);
            if (endDt.isBefore(startDt)) {
                this.errorMsg = ERROR_MSGS.startMoreThanEnd;
            } else if (endDt.diff(startDt, 'days') > MAX_DAY_RANGE) {
                this.errorMsg = ERROR_MSGS.moreThan60Days;
            }
        }

        return this.errorMsg ? false : true;
    }

    private populateScatterPlot = (response: StationDailyDataCollection) => {
        console.log(response);
        if (response.stationDailyData) {
            this.dataTable = new google.visualization.DataTable();
            this.dataTable.addColumn('number', 'TAU3 Mean');
            this.dataTable.addColumn('number', 'PM25 Mean');
            this.maxOccurred = response.maxOccurred;
            this.minOccurred = response.minOccurred;
            this.validData = true;
            response.stationDailyData.forEach(data => {
                this.dataTable.addRow([data.tau3Mean, data.pm25Mean]);
            });
            if (this.showScatterPlot()) {
                this.$rootScope.$emit('showScatterPlot', this.dataTable);
            }
        } else {
            this.$rootScope.$emit('hideScatterPlot');
            this.validData = false;
        }
    }
}
