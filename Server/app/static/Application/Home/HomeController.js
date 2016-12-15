(function () {
    "use strict";

    angular.module("app")
    .controller("HomeController", ["$scope", "ChatService", homeController]);

    function homeController($scope, ChatService) {
        console.log("aici")

        $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

       setTimeout(function(){
        $("#dateModal").modal('show');
    }, 1000);



        $scope.chat = {};

        var dataToSend = {
            "message": "hello",
            "type": "conversation"
        };

        ChatService.create({}, dataToSend, function(data){
            console.log(data);
        });
       
    }
}());