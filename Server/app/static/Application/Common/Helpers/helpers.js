var _Helper = {

    toDoFunction: function () {
    }

};


(function () {
    'use strict';

    var HelperProvider = Class.extend({
        instance: _Helper,

        /**
         * Configures and returns instance of GlobalEventBus.
         *
         * @return {GlobalEventBus}
         */
        $get: [function () {
            return this.instance;
        }]
    });

    angular.module('helpers', []).provider('Helper', HelperProvider);
}());