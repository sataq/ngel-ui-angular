import * as angular from "angular";

export function initConfig(app: angular.IModule) {
    /* @ngInject */
    app.config(function ($httpProvider: angular.IHttpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push((ORIGIN: string) => {
            return {
                "request": function (config) {
                    if (/^\//.test(config.url)) {
                        config.url = `${ORIGIN}${config.url}`;
                    }
                    return config;
                }
            };
        });
    });
}
