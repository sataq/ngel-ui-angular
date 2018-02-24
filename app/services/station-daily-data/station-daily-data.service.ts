import * as angular from "angular";
import {ApiUrl} from "../../models/app-config.model";
import {Icon, StationDailyDataCollection, StationsWithIconCollection, StationCollection} from "../../models/station.model";

export interface StationsService {
    getStations: (occurred?: number) => angular.IPromise<StationsWithIconCollection>;
    getStationDailyData: (ngelId: string, startDate?: number, endDate?: number) => angular.IPromise<StationDailyDataCollection>;
}

interface StationsResponse { data: StationCollection };
interface StationDailyDataResponse { data: StationDailyDataCollection };

const DEFAULT_COLOR_BLACK = 'rgb(0, 0, 0)';
const DEFAULT_COLOR_WHITE = 'rgb(255, 255, 255)';
const DEFAULT_ICON = 'CIRCLE';
const DEFAULT_FILL_OPACITY = 0;
const DEFAULT_SCALE = 5;
const DEFAULT_STROKE_WEIGHT = 0.5;

/* @ngInject */
export function stationsService($http: angular.IHttpService, apiUrl: ApiUrl, $q: angular.IQService): StationsService {

    let getColor = (station) => {
        if (station.latestPM25Mean !== -1) {
            const pm25Mean = station.latestPM25Mean;
            if (pm25Mean >= 0 && pm25Mean <= 12) {
                return 'rgb(99, 230, 17)';
            }
            if (pm25Mean >= 12.1 && pm25Mean <= 35.4) {
                return 'rgb(254, 250, 41)';
            }
            if (pm25Mean >= 35.5 && pm25Mean <= 55.4) {
                return 'rgb(236, 111, 37)';
            }
            if (pm25Mean >= 55.5 && pm25Mean <= 150.4) {
                return 'rgb(230, 46, 37)';
            }
            if (pm25Mean >= 150.5 && pm25Mean <= 250.4) {
                return 'rgb(130, 28, 61)';
            }
            if (pm25Mean >= 250.5) {
                return 'rgb(103, 21, 27)';
            }
        }
        return DEFAULT_COLOR_BLACK;
    };

    let getFillOpacity = (station) => {
        if (station.latestPM25Mean === -1.0) {
          return DEFAULT_FILL_OPACITY;
        }
        if (station.latestPM25Mean >= 100) {
          return 1;
        }
        return station.latestPM25Mean / 100;
    }

    let getScale = (station) => {
        if (station.latestPM25Mean === -1.0) {
          return DEFAULT_SCALE;
        }
        return station.latestPM25Mean / 5;
    }

    let getStrokeColor = (station) => {
        if (station.latestPM25Mean === -1.0) {
          return DEFAULT_COLOR_BLACK;
        }
        return DEFAULT_COLOR_WHITE;
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
                                scale: getScale(station),
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
