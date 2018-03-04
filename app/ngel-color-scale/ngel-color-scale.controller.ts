export class NgelColorScaleController {
    
    pm25RangesWithColor;

    /* @ngInject */
    constructor() {}

    $onInit() {
        this.pm25RangesWithColor = [
            {
                range: '<=-1',
                colorClass: 'ngel-color-scale__color--black'
            },
            {
                range: '0-12',
                colorClass: 'ngel-color-scale__color--green'
            },
            {
                range: '12.1-35.4',
                colorClass: 'ngel-color-scale__color--yellow'
            },
            {
                range: '35.5-55.4',
                colorClass: 'ngel-color-scale__color--orange'
            },
            {
                range: '55.5-150.4',
                colorClass: 'ngel-color-scale__color--red'
            },
            {
                range: '150.5-250.4',
                colorClass: 'ngel-color-scale__color--jazzberry-jam'
            },
            {
                range: '>=250.5',
                colorClass: 'ngel-color-scale__color--burgundy'
            }
        ];
    }
}
