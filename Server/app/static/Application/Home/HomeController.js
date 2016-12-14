(function () {
    "use strict";

    angular.module("app")
    .controller("HomeController", ["$scope", "$http", homeController]);

    function homeController($scope, $http) {
        console.log("aici")

        $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };
    }
}());