(function () {
    'use strict';

    var LOCAL_DEBUG = false;
    if (((location.href).toLowerCase()).indexOf('google-ngrams-events-extraction.dev:5000') != -1) {
        LOCAL_DEBUG = true;
    }

    // Static
    angular.module('config', [])
        // API Urls
        .constant("API", {
            url: LOCAL_DEBUG ? "/google-ngrams-events-extraction.dev:5000/api" : "/api",
            root: LOCAL_DEBUG ? "/google-ngrams-events-extraction.dev:5000" : "",
            modules: "/Application/Modules"
        })
        // Logger modules
        .constant("LoggerModules", {
            HomeController: "HomeController"
        })

    ;

    // Configurable
    angular.module('config')
        // User authenticated
        .value("User", {
            // Will be filled after initializing the application
        });
}());