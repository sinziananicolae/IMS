(function () {
    'use strict';

    angular.module('app.mainapp', ['services', 'config'])
        .config(["$routeProvider", "$locationProvider", "API", "$httpProvider", function ($routeProvider, $locationProvider, API, $httpProvider) {
            var homeView = API.modules + '/Home/View';
            
            $routeProvider.
                when('/home', { templateUrl: homeView + '/home.html', controller: 'HomeController' }).
                otherwise({ redirectTo: '/home' });

            $httpProvider.interceptors.push('myHttpInterceptor');
        }]);
}());
