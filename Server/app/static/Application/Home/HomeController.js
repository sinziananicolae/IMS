(function () {
    "use strict";

    angular.module("app")
    .controller("HomeController", ["$scope", "ChatService", homeController]);

    function homeController($scope, ChatService) {
        console.log("aici")

        $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

    //    setTimeout(function(){
    //     $("#dateModal").modal('show');
    // }, 1000);



        $scope.chat = {};
        $scope.chat.items = [];

        var dataToSend = {
            "message": "hello",
            "type": "conversation"
        };

        function apiCall() {
            ChatService.create({}, dataToSend, function(data){
                var date = new Date();
                var chatItem = {
                    type: 1,
                    message: data.message,
                    time: date.getHours() + ":" + date.getMinutes()
                };

                if(data.places){
                    chatItem.destination = {
                        latitude: 52.507629,
                        longitude: 13.1459636
                    };
                    $scope.map = { center: { latitude: chatItem.destination.latitude, longitude: chatItem.destination.longitude }, zoom: 9 };
                }

                $scope.chat.conversatioId = data.conversationId;
                $scope.chat.items.push(chatItem);
            });
        }
        apiCall();

        $scope.sendMessage = function(userMessage){
            var date = new Date();
            var chatItem = {
                type: 2,
                message: userMessage,
                time: date.getHours() + ":" + date.getMinutes()
            };
            $scope.chat.items.push(chatItem);

            dataToSend.message = userMessage;
            dataToSend.conversationId = $scope.chat.conversatioId;
            apiCall();
            $scope.userMessage = "";
        }
       
    }
}());