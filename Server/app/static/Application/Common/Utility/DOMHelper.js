(function () {
    'use strict';

    var DOMHelper = Class.extend({
        appendScript: function (parent, scriptElt, listener) {
            // append a script element as last child in parent and configure
            // provided listener function for the script load event
            //
            // params:
            //   parent - (DOM element) (!nil) the parent node to append the script to
            //   scriptElt - (DOM element) (!nil) a new script element
            //   listener - (function) (!nil) listener function for script load event
            //
            // Notes:
            //   - in IE, the load event is simulated by setting an intermediate
            //     listener to onreadystate which filters events and fires the
            //     callback just once when the state is "loaded" or "complete"
            //
            //   - Opera supports both readyState and onload, but does not behave in
            //     the exact same way as IE for readyState, e.g. "loaded" may be
            //     reached before the script runs.

            var safelistener = function () {
                try {
                    listener();
                } catch (e) {
                    // do something with the error
                }
            };

            // Opera has readyState too, but does not behave in a consistent way
            if (scriptElt.readyState && scriptElt.onload !== null) {
                // IE only (onload===undefined) not Opera (onload===null)
                scriptElt.onreadystatechange = function () {
                    if (scriptElt.readyState === "loaded" ||
                        scriptElt.readyState === "complete") {
                        // Avoid memory leaks (and duplicate call to callback) in IE
                        scriptElt.onreadystatechange = null;
                        safelistener();
                    }
                };
            } else {
                // other browsers (DOM Level 0)
                scriptElt.onload = safelistener;
            }

            parent.appendChild(scriptElt);
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
    var DOMHelperProvider = Class.extend({

        instance: new DOMHelper(),

        /**
         * Configures and returns instance of GlobalEventBus.
         *
         * @return {GlobalEventBus}
         */
        $get: [function () {
            return this.instance;
        }]
    });

    angular.module('services.helpers', [])
        .provider('Helpers', DOMHelperProvider);
}());