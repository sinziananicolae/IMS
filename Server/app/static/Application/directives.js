 (function() {

   angular.module("directives", [])
   .directive('mydatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (date) {
                        scope.date = date;
                        scope.$apply();
                    }
                });
            }
    }})
    .directive("dateModal", [function () {
            return {
                restrict: "E",
                scope: false,
                templateUrl: "Application/Home/dateModal.html"
            }
        }]);
}());