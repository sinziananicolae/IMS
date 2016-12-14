(function () {
    'use strict';

    var LOCAL_DEBUG = false;
    if (((location.href).toLowerCase()).indexOf('google-ngrams-events-extraction.dev:5000') != -1) {
        LOCAL_DEBUG = true;
    }

    angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ngResource',
        'ngAnimate',
        'filters',
        'services.notifications',
        'services.helpers',
        'services.httpRequestTracker',
        'directives',
        'helpers',
        'app.mainapp',
        'ui.bootstrap',
        'chart.js'
    ]).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        // Global Config

        //if (!LOCAL_DEBUG) {
        //    $locationProvider.html5Mode(true);
        //}

        $httpProvider.interceptors.push('myHttpInterceptor');

        var spinnerFunction = function (data, headersGetter) {
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
        //        $httpProvider.defaults.transformResponse = [];

    }]).run(['LoggerModules', function (LoggerModules) {
        // Get the current user when the application starts
        // (in case they are still logged in from a previous session)

        // security.requestCurrentUser();
        Logger.useDefaults();

        function loggerHandler(messages, context) {
            // Send messages to a custom logging endpoint for analysis.

            if (!LOCAL_DEBUG) {
                return;
            }

            var params = [];
            params.push('[' + context.name + ']#');
            _.each(messages, function (log) {
                params.push(log);
            });

            if (filterModules(context.name)) {
                switch (context.level.name) {
                    case 'DEBUG':
                        console.debug.apply(console, params);
                        break;
                    case 'INFO':
                        console.info.apply(console, params);
                        break;
                    case 'WARN':
                        console.warn.apply(console, params);
                        break;
                    case 'ERROR':
                        console.error.apply(console, params);
                        break;
                }

            }
        }

        Logger.setHandler(loggerHandler);

        function filterModules(logModule) {
            if (ActiveModules === undefined ||
                ActiveModules.length === 0) {
                return true;
            }

            var willLog = _.contains(ActiveModules, logModule);
            return willLog;
        }

        // Filter for modules you desire to filter
        var ActiveModules = [
            // Add modules Here e.g. below
            // LoggerModules.SectionEdit
        ];

        // Default for all logs, if not specified per module
        Logger.setLevel(Logger.INFO);

    }])
        .factory("errorLogService", ["$log", "$window", "API", function ($log, $window, API) {

            function log(exception, cause) {

                if (LOCAL_DEBUG) {
                    return;
                }

                $log.error.apply($log, arguments);

                try {
                    var errorMessage = exception.toString();

                    $.ajax({
                        type: "POST",
                        url: API.url + "/ClientSideError",
                        contentType: "application/json",
                        data: angular.toJson({
                            URL: $window.location.href.toString(),
                            ErrorMessage: errorMessage.toString()
                        })
                    });

                } catch (loggingError) {
                    $log.warn("Error logging failed");
                    $log.log(loggingError);
                }
            }

            return log;

        }]).factory('myHttpInterceptor', ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
            $rootScope.pendingRequests = 0;
            return {
                'request': function (config) {
                    $rootScope.pendingRequests++;
                    return config || $q.when(config);
                },

                'requestError': function (rejection) {
                    $rootScope.pendingRequests--;
                    return $q.reject(rejection);
                },

                'response': function (response) {
                    $rootScope.pendingRequests--;
                    return response || $q.when(response);
                },

                'responseError': function (rejection) {

                    if (rejection.status === 401) {
                        toastr.error("You are not authorized!");
                        if ($location.url() != '/') {
                            $location.url('/');
                        }
                    }

                    $rootScope.pendingRequests--;
                    return $q.reject(rejection);
                }
            };
        }])
})();