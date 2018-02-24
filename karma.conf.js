var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var path = require('path');

webpackConfig.module.rules.push({
    test: /\.ts$/,
    exclude: /(node_modules|spec|\.d\.ts$)/,
    include: path.resolve("app/"),
    enforce: "post",
    loader: 'istanbul-instrumenter-loader'
});

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'phantomjs-shim'],
        files: [ 'app/spec-entry.ts' ],
        reporters: ["dots", "coverage-istanbul", "junit"],
        preprocessors: { 'app/spec-entry.ts': ['webpack'] },

        coverageIstanbulReporter: {
            reports: ["html", "cobertura", "text-summary"],
            dir: path.join(__dirname, "build/reports/coverage"),
            fixWebpackSourcePaths: true,

            'report-config': {
                html: { subdir: "html" },
                cobertura: { file: "cobertura/cobertura.txt" }
            },
        },

        junitReporter: {
            outputFile: "build/reports/junit/junit.xml"
        },

        webpack: {
            watch: true,
            resolve: webpackConfig.resolve,
            plugins: webpackConfig.plugins.slice(1),
            module: { rules: webpackConfig.module.rules }
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require('karma-webpack'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-junit-reporter'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-ie-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-phantomjs-shim')
        ]
    });
};