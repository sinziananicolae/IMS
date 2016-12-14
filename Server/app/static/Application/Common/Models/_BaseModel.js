var _BaseModel = Class.extend({

    _Service: null,

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */
    init: function (serviceName) {
        this._Service = _Util.injectService(serviceName);
    },

    save: function (fnCallback) {
        var _this = this;
        this._Service.save(_this.getEntity(), function (response) {
            if (_this._handleServerResponse(response)) {
                fnCallback(response);
            }
        });
    },

    update: function (fnCallback) {
        var _this = this;
        this._Service.update(_this.getEntity(), function (response) {
            if (_this._handleServerResponse(response)) {
                fnCallback(response);
            }
        });
    },

    delete: function (fnCallback) {
        var _this = this;
        this._Service.remove({ id: _this.Id }, function (response) {
            if (_this._handleServerResponse(response)) {
                fnCallback(response);
            }
        });
    },

    _handleServerResponse: function (response) {
        //if (response.status === 'ok') {
        return true;
        //}

        // TODO: Make global notification about the error

        //return false;
    },

    getEntity: function () {
        var entity = {};
        _Util.cloneObject(this, entity);
        return entity;
    },

    /**
     * Triggered when controller is about
     * to be destroyed, clear all remaining values.
     */
    destroy: function (event) {
        //OVERRIDE
    }
});
