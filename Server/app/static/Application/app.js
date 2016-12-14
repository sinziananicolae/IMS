(function () {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ngResource',
        'ngAnimate',
        'ui.bootstrap',
        'uiGmapgoogle-maps'
    ]).config(["$routeProvider", function($routeProvider) {
	    $routeProvider
	    .when("/home", {
	        templateUrl : "Application/Home/home.html",
	        controller : "HomeController"
	    })
        .otherwise({
            redirectTo: '/home'
        });
    }]);
})();