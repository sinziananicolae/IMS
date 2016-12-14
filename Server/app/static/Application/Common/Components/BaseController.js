var _BaseController = Class.extend({

    $scope: null,
    _WatchListeners: null,
    _Log: null,

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */
    init: function (scope, moduleName) {
        this.$scope = scope;
        this._WatchListeners = [];

        // Initialize logger
        if (!moduleName) {
            this._Log = Logger.get(scope.$id);
        } else {
            this._Log = Logger.get(moduleName);
        }

        this.defineListeners();
        this.defineScope();
    },

    addWatch: function (name, fn, isArray) {
        this._WatchListeners.push(this.$scope.$watch(name, fn, isArray));
    },

    addWatchGroup: function (group, fn) {
        var _this = this;
        _.each(group, function (watch) {
            _this._WatchListeners.push(_this.$scope.$watch(watch, fn, false));
        });
    },

    /**
     * Initialize listeners needs to be overrided by the subclass.
     * Don't forget to call _super() to activate
     */
    defineListeners: function () {
        this.$scope.$on('$destroy', this.destroy.bind(this));
        this.$scope.$on('$destroy', this.removeWatchListeners.bind(this));
    },


    /**
     * Use this function to define all scope objects.
     * Give a way to instantaly view whats available
     * publicly on the scope.
     */
    defineScope: function () {
        //OVERRIDE
    },


    /**
     * Triggered when controller is about
     * to be destroyed, clear all remaining values.
     */
    destroy: function (event) {
        //OVERRIDE
    },

    removeWatchListeners: function () {
        // Remove watch listeners

        for (var i = 0; i < this._WatchListeners.length; i++) {
            this._WatchListeners[i]();
        }
    }
});


_BaseController.$inject = ['$scope'];