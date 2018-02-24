import * as angular from "angular";
import { stationsService } from "./services/station-daily-data/station-daily-data.service";

export function initServices(app: angular.IModule) {
    app.service("stationsService", stationsService);
}
