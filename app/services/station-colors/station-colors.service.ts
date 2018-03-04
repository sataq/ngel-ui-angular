export interface StationColorService {
    getColor(pm25Mean: number): string;
    getStrokeColor(pm25Mean: number): string;
}

const DEFAULT_COLOR_BLACK = 'rgb(0, 0, 0)';
const DEFAULT_COLOR_WHITE = 'rgb(255, 255, 255)';
const DEFAULT_GREEN = 'rgb(0, 228, 0)';
const DEFAULT_YELLOW = 'rgb(255, 255, 0)';
const DEFAULT_ORANGE = 'rgb(255, 126, 0)';
const DEFAULT_RED = 'rgb(255, 0, 0)';
const DEFAULT_PURPLE = 'rgb(153, 0, 76)';
const DEFAULT_BROWN = 'rgb(126, 0, 35)';

/* @ngInject */
export function stationColorService(): StationColorService {
    return {
        getColor: (pm25Mean: number): string => {
            if (pm25Mean === -1.0) {
                return DEFAULT_COLOR_BLACK;
            }
            if (pm25Mean >= 0 && pm25Mean <= 12.099999) {
                return DEFAULT_GREEN;
            }
            if (pm25Mean >= 12.1 && pm25Mean <= 35.499999) {
                return DEFAULT_YELLOW;
            }
            if (pm25Mean >= 35.5 && pm25Mean <= 55.499999) {
                return DEFAULT_ORANGE;
            }
            if (pm25Mean >= 55.5 && pm25Mean <= 150.499999) {
                return DEFAULT_RED;
            }
            if (pm25Mean >= 150.5 && pm25Mean <= 250.499999) {
                return DEFAULT_PURPLE;
            }
            if (pm25Mean >= 250.5) {
                return DEFAULT_BROWN;
            }
        },
        getStrokeColor: (pm25Mean: number): string => {
            if (pm25Mean === -1.0) {
                return DEFAULT_COLOR_BLACK;
            }
            return DEFAULT_COLOR_WHITE;
        }
    };
}
