(function () {
    "use strict";

    angular.module("app")
    .controller("HomeController", ["$scope", "ChatService", homeController]);

    function homeController($scope, ChatService) {
        console.log("aici")

        $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        $scope.chat = {};
        $scope.chat.items = [];
        $scope.markers = [];

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
                        latitude: data.places[0].latitude,
                        longitude: data.places[0].longitude
                    };
                    $scope.map = { center: { latitude: chatItem.destination.latitude, longitude: chatItem.destination.longitude }, zoom: 12 };
                }

                if(data.message === "Nice choice! When do you want to visit this city?") {
                    $("#dateModal").modal('show');
                }

                if(data.type === "subcategory") {
                    $scope.subcategories = data.subcategories;
                    $("#subcategoryModal").modal('show');
                }

                if(data.places && data.places.length > 0) {
                    $scope.markers = [];
                    _.each(data.places, function(place, index) {
                        $scope.markers.push({
                            id: index,
                            latitude: place.latitude,
                            longitude: place.longitude,
                            title: place.name,
                            description: place.address,
                            status: place.status,
                            price: place.price,
                            show: false
                        });
                    });
                }

                if(data.weather) {
                    chatItem.weather = data.weather;
                }

                $scope.chat.conversatioId = data.conversationId;
                $scope.chat.items.push(chatItem);
                setTimeout(function(){$("#chatDiv").animate({scrollTop: "1000000px"}, 1000);}, 200);
            });
        }
        apiCall();

        $scope.sendMessage = function(userMessage, type){
            var date = new Date();
            var chatItem = {
                type: 2,
                message: userMessage,
                time: date.getHours() + ":" + date.getMinutes()
            };
            $scope.chat.items.push(chatItem);
            setTimeout(function(){$("#chatDiv").animate({scrollTop: "1000000px"}, 1000);}, 200);

            dataToSend.message = userMessage;
            dataToSend.conversationId = $scope.chat.conversatioId;
            dataToSend.type = type === 1 ? "conversation" : "subcategory";

            if(userMessage.indexOf('weather') >= 0) {
                dataToSend.type = 'weather';
            }

            apiCall();
            $scope.userMessage = "";
        }

        $scope.parseDates = function(startDate, endDate) {
            var message = "from " + months[startDate.getMonth()] + ' ' + startDate.getDate() + ' ' + startDate.getFullYear() + ' to '
                + months[endDate.getMonth()] + ' ' + endDate.getDate() + ' ' + endDate.getFullYear();
            $scope.sendMessage(message, 1);
        }

        $scope.sendSubcategory = function(subcategory) {
            $scope.sendMessage(subcategory);
            dataToSend.subcategories = [subcategory];
        }
       
    }
}());