import * as angular from "angular";

const TRENDLINE_OPTIONS = {
    type: 'linear',
    color: '#000000',
    lineWidth: 3,
    opacity: 0.3,
    showR2: true,
    visibleInLegend: true,
};

const CHART_OPTIONS = {
    legend: {
        position: 'right',
        textStyle: {
            fontSize: 11,
        },
    } as google.visualization.ChartLegend,
    hAxis: { title: 'MODIS Aerosol Optical Depth at 550 nm' },
    vAxis: { title: `PM2.5 Mass Concentration \u03BCg/m3` },
    backgroundColor: '#d3d3d3',
    colors: ['#ff0000'],
    chartArea: {
        backgroundColor: '#ffffff',
        width: '50%',
    },
    trendlines: { 0: TRENDLINE_OPTIONS },
};

export class NgelScatterPlotController {

    chart: google.visualization.ScatterChart;
    numberOfPoints: number

    /* @ngInject */
    constructor(private $rootScope: angular.IRootScopeService) {}

    $onInit() {
        this.$rootScope.$on('showScatterPlot', (_event, data: google.visualization.DataTable) => {
            this.showScatterPlot(data);
        });
        this.$rootScope.$on('hideScatterPlot', (_event) => {
            this.hideScatterPlot();
        });
        this.chart = new google.visualization.ScatterChart(document.getElementById('ngel-site-info-scatter-plot'));
    }

    showScatterPlot(data: google.visualization.DataTable) {
        this.chart.draw(data, CHART_OPTIONS);
        this.numberOfPoints = data.getNumberOfRows();
    }

    hideScatterPlot() {
        this.chart.clearChart();
        this.numberOfPoints = 0;
    }
}
