import {StationsWithIconCollection} from "../models/station.model";
import { StationsService } from "../services/station-daily-data/station-daily-data.service";
import moment = require('moment');

export class NgelLandingController {

    stations: StationsWithIconCollection;
    selectedDate: Date;

    /* @ngInject */
    constructor(private $route: angular.route.IRouteService, private stationsService: StationsService) {}

    $onInit() {
        this.stations = this.$route.current.locals["stations"];
    }

    refreshMap() {
        if (this.selectedDate) {
            this.stationsService.getStations(moment(this.selectedDate).valueOf()).then((response: StationsWithIconCollection) => {
                this.stations = response;
            });
        }
    }
}
