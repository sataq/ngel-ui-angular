"use strict";

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs');
const startMockServer = require('./mock-backend/mock-server');
const appConfig = require('./app-config.json');
const packageJson = require('./package.json');
const fs = require('fs');
const mainContent = fs.readFileSync("./app/main-content.html");
const autoprefixer = require('autoprefixer');
const sassLintPlugin = require('sasslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevServer = process.argv[1].indexOf("webpack-dev-server") !== -1;
if (isDevServer) { startMockServer(); }

let env = yargs.argv.env || { config: "prod" };
if (!env.config) { env.config = "prod"; }

let tsLintOptions = {};

if (env.ci) {
    tsLintOptions = {
        formatter: "checkstyle",
        fileOutput: {
            dir: "./build/reports/checkstyle/tslint/",
            ext: "xml",
            clean: true
        }
    };
}

const autoPrefixerBrowsers = [
    "Chrome >= 40", "Edge >= 1", "ie >= 11", "ff >= 36", "Safari >= 8", "last 2 versions"
];

const exported = {
    context: __dirname,
    entry: "./app/entry.ts",

    output: {
        path: path.join(__dirname, 'public'),
        filename: "app.[hash].js",
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: 'tslint-loader',
                options: tsLintOptions
            },
            {
                test: /\.ts$/,
                use: [
                    { loader: 'cache-loader' },
                    { loader: 'thread-loader' },
                    {
                        loader: 'ts-loader',
                        options: { happyPackMode: true }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "ngtemplate-loader",
                        options: { relativeTo: "app/" }
                    },
                    {
                        loader: "html-loader",
                        options: {
                            minimize: isDevServer,
                            removeAttributeQuotes: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader", options: { sourceMap: true }},
                    { loader: "css-loader", options: { sourceMap: true }},
                    { loader: "resolve-url-loader", options: { sourceMap: true }},
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                require("autoprefixer")({ browsers: autoPrefixerBrowsers })
                            ]
                        }
                    },
                    { loader: "sass-loader", options: { sourceMap: true }}
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: { query: {limit: 100000}}
                }]
            }
        ]
    },
    externals: [
        "angular",
        { "angular-route": "ngRoute" },
        { "angular-aria": "ngAria"}
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts"]
    },
    devtool: 'source-maps',
    devServer: {
        port: 8070,
        publicPath: "/ngel/",
        contentBase: path.join(__dirname, 'public'),
        noInfo: true,
        proxy: { "*": "http://localhost:3000" },
        hot: false,
        inline: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            ngAppName: "App",
            title: 'Ngel',
            template: './layout.html',
            mainContent: mainContent,
            microappName: "Version",
            microappVersion: `${packageJson.version}`,
            cdnResources: {
                js: [
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-route.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-aria.js",
                    "http://www.google.com/jsapi",
                    "https://www.gstatic.com/charts/loader.js"
                ]
            },
            minify: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                removeCDATASectionsFromCDATA: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                collapseInlineTagWhitespace: true,
                collapseBooleanAttributes: true,
                removeTagWhitespace: true,
                preventAttributesEscaping: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                caseSensitive: true
            }
        }),
        new sassLintPlugin({
            configFile: '.sass-lint.yml',
            context: 'app/'
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConfig[env.config])
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ngAnnotatePlugin(),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
    ]
};

module.exports = exported;
