var _Util = {

    injectService: function (serviceName) {
        var injector = angular.element(document.getElementById('app')).injector();
        return injector.get(serviceName);
    },

    safeApply: function (scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
    },

    formatUrl: function (url) {
        if (url.indexOf('http') == -1 ||
            url.indexOf('https') == -1) {
            url = "http://" + url;
        }

        return url;
    },

    cloneObjectFully: function (obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },

    cloneObject: function (src, dest) {
        for (var prop in src) {
            if (typeof src[prop] !== 'function') {
                dest[prop] = src[prop];
            }
        }
        return dest;
    },

    cloneObjectFunctions: function (src, dest) {
        for (var prop in src) {
            if (typeof src[prop] === 'function') {
                dest[prop] = src[prop];
            }
        }
        return dest;
    }
};

(function () {
    'use strict';

    var UtilProvider = Class.extend(_Util);

    angular.module('util', []).provider('Util', UtilProvider);
})();
