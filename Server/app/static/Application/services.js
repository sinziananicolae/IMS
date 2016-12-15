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
            return $resource("https://damp-plateau-16338.herokuapp.com/api/conversation", {}, serviceMetods);
        }]);
}())