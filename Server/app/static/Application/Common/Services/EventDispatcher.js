(function () {
    'use strict';

    var EventDispatcher = Class.extend({
        _listeners: {},

        /**
         * Add a listener on the object
         * @param type : Event type
         * @param listener : Listener callback
         */
        addEventListener: function (type, listener) {
            if (!this._listeners[type]) {
                this._listeners[type] = [];
            }
            this._listeners[type].push(listener);
        },


        /**
         * Remove a listener on the object
         * @param type : Event type
         * @param listener : Listener callback
         */
        removeEventListener: function (type, listener, source) {
            if (this._listeners[type]) {
                var index = this._listeners[type].indexOf(listener);
                if (index !== -1) {
                    this._listeners[type].splice(index, 1);
                }
            }
        },

        /**
         * Dispatch an event to all registered listener
         * @param Mutiple params available, first must be string
         */
        dispatchEvent: function (val) {
            var listeners;

            //console.log('val ', val);

            if (typeof arguments[0] !== 'string') {
                console.warn('EventDispatcher', 'First params must be an event type (String)');
            } else {
                listeners = this._listeners[arguments[0]];
                for (var key in listeners) {
                    listeners[key].apply(undefined, arguments);
                }
            }
        }
    });

    /**
     * Create a global event dispatcher
     * that can be injected accross multiple components
     * inside the application
     *
     * Use of Class.js
     * @type {class}
     * @author universalmind.com
     */
    var NotificationsProvider = Class.extend({

        instance: new EventDispatcher(),

        /**
         * Configures and returns instance of GlobalEventBus.
         *
         * @return {GlobalEventBus}
         */
        $get: [function () {
            this.instance.notify = this.instance.dispatchEvent;
            return this.instance;
        }]
    });

    angular.module('services.notifications', [])
        .provider('Notifications', NotificationsProvider);
}());