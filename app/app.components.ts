import * as angular from "angular";
import { ngelLanding } from "./ngel-landing/ngel-landing";
import { ngelMap } from "./ngel-map/ngel-map";
import { ngelSiteInfo } from "./ngel-site-info/ngel-site-info";
import { ngelScatterPlot } from "./ngel-scatter-plot/ngel-scatter-plot";
import { ngelDateRangePicker } from "./ngel-date-range-picker/ngel-date-range-picker";
import { ngelDatePickerPanel } from "./ngel-date-picker-panel/ngel-date-picker-panel";
import { ngelColorScale } from "./ngel-color-scale/ngel-color-scale";

export function initComponents(app: angular.IModule) {
    app.directive("ngelLanding", () => ngelLanding);
    app.directive("ngelMap", () => ngelMap);
    app.directive("ngelSiteInfo", () => ngelSiteInfo);
    app.directive("ngelScatterPlot", () => ngelScatterPlot);
    app.directive("ngelDateRangePicker", () => ngelDateRangePicker);
    app.directive("ngelDatePickerPanel", () => ngelDatePickerPanel);
    app.directive("ngelColorScale", () => ngelColorScale);
}
