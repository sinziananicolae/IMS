(function () {
    'use strict';

    angular.module('app.mainapp')
    .controller("HomeController", ['$scope', '$location', 'LoggerModules', 'API', 'PeaksService', 'EventsService', 'WordsRankingService', _BaseController.extend({

        _API: null,
        _PeaksService: null,
        _EventsService: null,
        _WordsRankingService: null,

        /* @Override */
        init: function ($scope, $location, LoggerModules, API, PeaksService, EventsService, WordsRankingService) {
            this.$scope = $scope;
            this.$location = $location;

            this._API = API;
            this._PeaksService = PeaksService;
            this._EventsService = EventsService;
            this._WordsRankingService = WordsRankingService;

            this._super($scope, LoggerModules.HomeController);
        },

        /* @Override */
        defineListeners: function () {
            this._super();
        },

        /* @Override */
        defineScope: function () {
            var _scope = this.$scope, _this = this;

            this._Log.info('Controller loaded!');

            _scope.onClick = this._onClick.bind(this);
            _scope.getPeaksAndGraphDataForWord = this._getPeaksAndGraphDataForWord.bind(this);
            _scope.getInformationOnEvent = this._getInformationOnEvent.bind(this);

            _scope.dynamicPopover = {
                templateUrl: 'infoTemplate.html'
              };

            //this.addWatch('numberOfItemsPerPage', this._watchItemsPerPage.bind(this));

        },

        _getPeaksAndGraphDataForWord: function (word) {
            var _this = this,
            _scope = this.$scope;

            _scope.searchWord = word;

            _this._PeaksService.get({ param1: word }, function (response) {
                _this._Log.info("Peaks Response loaded: ", response);

                var labels = Object.keys(response.graph_values);
                var labels_filtered = [], colours = [];
                _.each(labels, function (label, $index) {
                    if (_.contains(response.peaks, parseInt(label))) {
                        labels_filtered[$index] = label;
                        colours[$index] = "red";
                    }
                    else {
                        labels_filtered[$index] = label//"";
                        colours[$index] = "#A9C4D2";
                    }
                });

                _scope.labels = labels_filtered;
                _scope.series = [word];

                var valuessss = _.values(response.graph_values);
                for (var i = 0; i < valuessss.length; i++) {
                    valuessss[i] = valuessss[i] * 10000000;
                }

                _scope.data = [valuessss];
                _scope.options = {
                    tooltipTemplate: function (label) {
                        if (label.label !== "") {
                            return "Peak: " + label.label + " y: " + label.value;
                        }
                        else return "No peak: " + label.label +" y: " + label.value;
                    },
                    pointHitDetectionRadius : 1,
                    responsive: true
                };
                _scope.colours = [{pointColor:colours, fillColor: "#E7EDF0", strokeColor: "#A9C4D2"}];

                _this._getAmplitudeForPeaks(response.peaks, response.graph_values);

            })
        },

        _getAmplitudeForPeaks: function(peaks, values){
            var _scope = this.$scope;

            _scope.amplitudesForPeaksLeft = {};
            _scope.amplitudesForPeaksRight = {};

            var allYears = _.map(values, function(value, key) { return parseInt(key) });
            _.each(peaks, function(peak){
                var peakValue = values[peak];
                var indexOfPeak = allYears.indexOf(peak);

                var referenceValue = peakValue;
                indexOfPeak -= 1;
                var firstLeftValue = values[allYears[indexOfPeak]];

                while(referenceValue > firstLeftValue && indexOfPeak >= 0) {
                    referenceValue = firstLeftValue;
                    indexOfPeak -= 1;
                    firstLeftValue = values[allYears[indexOfPeak]];
                }
                _scope.amplitudesForPeaksLeft[peak] = {
                    startYear: allYears[indexOfPeak + 1],
                    amplitude: (peakValue - referenceValue) * 10000000
                };

                var referenceValue = peakValue;
                var indexOfPeak = allYears.indexOf(peak);

                indexOfPeak += 1;
                var firstRightValue = values[allYears[indexOfPeak]];

                while(referenceValue > firstRightValue && indexOfPeak < allYears.length) {
                    referenceValue = firstRightValue;
                    indexOfPeak += 1;
                    firstRightValue = values[allYears[indexOfPeak]];
                }
                _scope.amplitudesForPeaksRight[peak] = {
                    startYear: allYears[indexOfPeak - 1],
                    amplitude: (peakValue - referenceValue) * 10000000
                };
            });

            console.log("L: ", _scope.amplitudesForPeaksLeft);
            console.log("R: ", _scope.amplitudesForPeaksRight);
        },

        _onClick: function (points, evt) {
            var _this = this,
                _scope = this.$scope;

            if (points[0].label == "")  return;

            _scope.infoEvents = [];
            _scope.showLoadingData = true;

            angular.element('#eventsInfoModal').modal('show');

            if (!isNaN(points[0].label)) {
                var year = points[0].label;
                _scope.lastSelectedYear = year.toString();
                _this._EventsService.get({param1: _scope.searchWord, param2: year.toString()}, function(response) {
                    _this._Log.info("Events Response loaded: ", response);
                    _scope.infoEvents = response.Content;
                    _scope.showLoadingData = false;

                });
            }

        },

        _getInformationOnEvent: function(year, link) {
            var _this = this,
                _scope = this.$scope;

            var objToSend = {
                keyword: _scope.searchWord,
                year: _scope.lastSelectedYear,
                link: link
            }

            if (!_.isEmpty(_scope.infoEvents.words_ranking[year][link])) return;

            _scope.loadingRanking = true;
            _this._WordsRankingService.create({}, objToSend, function(response) {
                _this._Log.info("Events Response loaded: ", response);
                _scope.infoEvents.words_ranking[year][link] = response.Content;
                _scope.loadingRanking = false;
             });
        },


        /* @Override */
        destroy: function () {
            // remove listeners here
        }
    })
    ]);
}());