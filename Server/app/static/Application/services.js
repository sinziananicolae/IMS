(function() {
var serviceMetods = {
        get: { method: "GET" },
        create: { 
            method: "POST", 
            headers: { "Access-Control-Allow-Origin": "*" }
        },
        update: { method: "PUT" },
        patch: { method: "PATCH" },
        remove: { method: "DELETE" }
    };

    angular.module("services", ["ngResource"])
        .factory("ChatService", ["$resource", function ($resource) {
            return $resource("http://127.0.0.1:8594/api/conversation", {}, serviceMetods);
        }]);
}())