import * as angular from "angular";
import {ApiUrl} from "../../models/app-config.model";
import {Icon, StationDailyDataCollection, StationsWithIconCollection, StationCollection} from "../../models/station.model";
import { StationColorService } from "../station-colors/station-colors.service";

export interface StationsService {
    getStations: (occurred?: number) => angular.IPromise<StationsWithIconCollection>;
    getStationDailyData: (ngelId: string, startDate?: number, endDate?: number) => angular.IPromise<StationDailyDataCollection>;
}

interface StationsResponse { data: StationCollection };
interface StationDailyDataResponse { data: StationDailyDataCollection };

const DEFAULT_ICON = 'CIRCLE';
const DEFAULT_FILL_OPACITY = 0;
const DEFAULT_SCALE = 10;
const DEFAULT_STROKE_WEIGHT = 0.5;

/* @ngInject */
export function stationsService($http: angular.IHttpService, apiUrl: ApiUrl, $q: angular.IQService,
    stationColorService: StationColorService): StationsService {

    let getColor = (station) => {
        return stationColorService.getColor(station.latestPM25Mean);
    };

    let getFillOpacity = (station) => {
        if (station.latestPM25Mean === -1.0) {
          return DEFAULT_FILL_OPACITY;
        }
        return 1;
    }

    let getStrokeColor = (station) => {
        return stationColorService.getStrokeColor(station.latestPM25Mean);
    }

    let handleErrorResponse = (errorResponse): any => {
        if (errorResponse && errorResponse.status === 404) {
            return [];
        }
        return $q.reject(errorResponse);
    };

    return {
        getStations: (occurred?: number): angular.IPromise<StationsWithIconCollection> => {
            let url = apiUrl.stations;
            if (occurred) {
                url = `${url}?occurred=${occurred}`;
            }
            return $http.get(url)
                .then((response: StationsResponse) => {
                    return {
                        stationsWithIcon: response.data.stations.map((station) => {
                            const icon: Icon = {
                                path: DEFAULT_ICON,
                                fillColor: getColor(station),
                                fillOpacity: getFillOpacity(station),
                                scale: DEFAULT_SCALE,
                                strokeColor: getStrokeColor(station),
                                strokeWeight: DEFAULT_STROKE_WEIGHT
                            };
                            return {...station, icon};
                        }),
                        minOccurred: response.data.minOccurred,
                        maxOccurred: response.data.maxOccurred
                    };
                }, handleErrorResponse);
        },
        getStationDailyData: (ngelId: string, startDate?: number, endDate?: number): angular.IPromise<StationDailyDataCollection> => {
            let url = `${apiUrl.stationDailyData.replace(/\:ngelId/, ngelId)}`;
            if (startDate && endDate) {
                url = `${url}?startDate=${startDate}&endDate=${endDate}`;
            }
            return $http.get(url)
                .then((response: StationDailyDataResponse) => {
                    return response.data
                }, handleErrorResponse);
        }
    };
}
