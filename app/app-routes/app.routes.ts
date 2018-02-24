import * as angular from "angular";
import { StationsService } from "../services/station-daily-data/station-daily-data.service";

export function initRoutes(
    app: angular.IModule) {
    /* @ngInject */
    app.config(function($routeProvider: angular.route.IRouteProvider) {

    /* @ngInject */
    const stations = (stationsService: StationsService) => stationsService.getStations();

        $routeProvider
            .when("/", {
                template: "<ngel-landing></ngel-landing>",
                resolve: {
                    stations
                }    
            })
            .otherwise({ redirectTo: "/" });
    });
}
