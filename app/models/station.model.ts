export interface Station {
    ngelId: string;
    name: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    latestPM25Mean: number;
}

export interface StationCollection {
    stations: Station[],
    minOccurred: Date,
    maxOccurred: Date
}

export interface StationWithIcon extends Station {
    icon: Icon;
}

export interface StationsWithIconCollection {
    stationsWithIcon: StationWithIcon[],
    minOccurred: Date,
    maxOccurred: Date
}

export interface Icon {
    path: string;
    fillColor: string;
    fillOpacity: number;
    scale: number;
    strokeColor: string;
    strokeWeight: number;
}

export interface StationDailyDataCollection {
    stationDailyData: StationDailyData[],
    maxOccurred: Date,
    minOccurred: Date
}

export interface StationDailyData {
    ngelId: string;
    occurred: Date;
    tau3Mean: number;
    pm25Mean: number;
}
