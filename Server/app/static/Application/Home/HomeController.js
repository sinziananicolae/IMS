(function () {
    "use strict";

    angular.module("app")
    .controller("HomeController", ["$scope", "$http", homeController]);

    function homeController($scope, $http) {
        console.log("aici")
    }
}());