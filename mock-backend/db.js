module.exports = () => {
    "use strict";

    var faker = require("faker");

    var stations = [
        {
            ngelId: 'NGEL_OAPM_00001',
            name: 'Arica',
            city: 'Arica',
            country: 'CL',
            latitude: -18.483427991456,
            longitude: -70.290550727043,
            latestPM25Mean: 12.273000
        },
        {
            ngelId: 'NGEL_OAPM_00002',
            name: 'Alto-Hospicio',
            city: 'Alto-Hospicio',
            country: 'CL',
            latitude: -20.290466881209,
            longitude: -70.100192427636,
            latestPM25Mean: 7.330000
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            name: 'São-José-Do-Rio-Preto',
            city: 'São-José-Do-Rio-Preto',
            country: 'BR',
            latitude: -20.784689280000,
            longitude: -49.398277790000,
            latestPM25Mean: 26.500000
        },
        {
            ngelId: 'NGEL_OAPM_00004',
            name: 'Ribeirão-Preto-Centro',
            city: 'Sao-Paulo',
            country: 'BR',
            latitude: -21.177065940000,
            longitude: -47.818987670000,
            latestPM25Mean: 10.500000
        },
        {
            ngelId: 'NGEL_OAPM_00005',
            name: 'Escuela-E-10',
            city: 'Tocopilla',
            country: 'CL',
            latitude: -22.085518710314,
            longitude: -70.188682515839,
            latestPM25Mean: 7.241000
        },
        {
            ngelId: 'NGEL_OAPM_00006',
            name: 'Bomberos',
            city: 'Tocopilla',
            country: 'CL',
            latitude: -22.111064000000,
            longitude: -70.210828000000,
            latestPM25Mean: 20.587000
        },
        {
            ngelId: 'NGEL_OAPM_00007',
            name: 'Colegio-Pedro-Vergara-Keller',
            city: 'Calama',
            country: 'CL',
            latitude: -22.442839063040,
            longitude: -68.932546346863,
            latestPM25Mean: 13.833000
        },
        {
            ngelId: 'NGEL_OAPM_00008',
            name: 'Complejo-Deportivo-23-de-Marzo',
            city: 'Calama',
            country: 'CL',
            latitude: -22.460270722943,
            longitude: -68.937706917007,
            latestPM25Mean: 4.431000
        },
        {
            ngelId: 'NGEL_OAPM_00009',
            name: 'Estación-Centro',
            city: 'Calama',
            country: 'CL',
            latitude: -22.462144644634,
            longitude: -68.928061693390,
            latestPM25Mean: 45.623000
        },
        {
            ngelId: 'NGEL_OAPM_00010',
            name: 'Piracicaba',
            city: 'Piracicaba',
            country: 'BR',
            latitude: -22.701222340000,
            longitude: -47.649652690000,
            latestPM25Mean: 12.053000
        }
    ];

    var stationDailyData = [
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-01',
            tau3Mean: 2.2345,
            pm25Mean: 1.2356
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-02',
            tau3Mean: 4.674,
            pm25Mean: 3.45642
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-03',
            tau3Mean: 1.2344,
            pm25Mean: 5.0023
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-04',
            tau3Mean: 2.345,
            pm25Mean: 5.333
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-05',
            tau3Mean: 4.6532,
            pm25Mean: 7.33434
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-06',
            tau3Mean: 8.433,
            pm25Mean: 5.2323
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-07',
            tau3Mean: 3.4354,
            pm25Mean: 7.2434
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-08',
            tau3Mean: 9.2234,
            pm25Mean: 4.23234
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-09',
            tau3Mean: 7.34234,
            pm25Mean: 5.234324
        },
        {
            ngelId: 'NGEL_OAPM_00003',
            occurred: '2017-06-10',
            tau3Mean: 8.343,
            pm25Mean: 6.34235
        }
    ];

    return {
        stations: {stations: stations, maxOccurred: new Date('2018-02-10'), minOccurred: new Date('2018-01-01')},
        stationDailyData: {stationDailyData: stationDailyData, maxOccurred: new Date('2018-02-10'), minOccurred: new Date('2018-01-01')}
    };
}
