(function () {
    'use strict';

    var serviceMetods = {
        get: { method: 'GET' },
        create: { method: 'POST' },
        update: { method: 'PUT' },
        patch: { method: 'PATCH' },
        remove: { method: 'DELETE' }
    };

    angular.module('services', ['ngResource'])
    .factory('PeaksService', ['$resource', 'API', function ($resource, API) {
        return $resource('/getpeaks/:param1', { param1: "@param1" }, serviceMetods);
    }])

    .factory('EventsService', ['$resource', 'API', function ($resource, API) {
        return $resource('/getEventsInfo/:param1/:param2', { param1: "@param1", param2: "@param" }, serviceMetods);
    }])

    .factory('WordsRankingService', ['$resource', 'API', function ($resource, API) {
        return $resource('/getWordsRanking', { }, serviceMetods);
    }]);

}());
