import * as angular from "angular";
import { stationsService } from "./services/station-daily-data/station-daily-data.service";
import { stationColorService } from "./services/station-colors/station-colors.service";

export function initServices(app: angular.IModule) {
    app.service("stationsService", stationsService);
    app.service("stationColorService", stationColorService);
}
