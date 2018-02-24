import * as angular from "angular";
import {GoogleMaps} from '../models/app-config.model';
import {StationWithIcon, StationsWithIconCollection} from '../models/station.model';

let vm;
export class NgelMapController {
    
    googleMapsUrl: string;
    stations: StationsWithIconCollection;
    selectedDate: Date;

    /* @ngInject */
    constructor(private $rootScope: angular.IRootScopeService, private googleMaps: GoogleMaps) {}

    $onInit() {
        this.googleMapsUrl = this.googleMaps.url;
        vm = this;
        this.$rootScope.$emit('closeSiteInfo', 'show-site-info');
    }

    openSiteInfo(_event, station: StationWithIcon) {
        vm.$rootScope.$emit('openSiteInfo', 'show-site-info', station);
    }
}
