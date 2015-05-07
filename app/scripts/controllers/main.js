'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('MainCtrl', function ($scope, dataService, $filter, dataModels) {

    $scope.dataList = dataService.getData()
    $scope.readyToGo = false;
    $scope.difference = false;
    $scope.charttype = "lineChart"
    $scope.labels = [];
    $scope.allData = [];
    $scope.series = [];

    $scope.colors = ["#97BBCD", "#DCDCDC", "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];
    $scope.dataDisplayModel = dataModels.getDataModel();
    $scope.interval = dataModels.getInterval();
    $scope.chartstype = dataModels.getType();


    $scope.buildChart = function () {
      var interval = _.result(_.find($scope.interval, { 'checked' : true }) , 'action')
      var format = _.result(_.find($scope.interval, { 'checked' : true }) , 'format')
      $scope.getChart();
      $scope.getData($scope.fromDate, $scope.toDate, interval, [true, true, true]);
      $scope.getLabels($scope.fromDate, $scope.toDate, interval, format);
      $scope.getDifferences();
    }

    $scope.getChart = function() {
      $scope.charttype = _.find($scope.chartstype, {'checked' : true}).partial;
    }

    $scope.getData = function(startDate, endDate, interval, format) {

      $scope.series = [];
      $scope.allData = [];

      var dateArray = $scope.getDates(startDate, endDate, interval, format);

      for (var i = 0 ; i < $scope.dataDisplayModel.length ; i++) {

        if ($scope.dataDisplayModel[i].checked === true) {
          var field = $scope.dataList.fields.indexOf($scope.dataDisplayModel[i].field)

          var dataArray = [];

          for (var j = 0 ; j < dateArray.length ; j++) {
            var arrayList = $filter('filter')($scope.dataList.values, dateArray[j], true);
            var sum = _.sum(arrayList, field);
            dataArray.push(sum);
          }
          $scope.allData.push(dataArray);
          $scope.series.push($scope.dataDisplayModel[i].name);

          dataService.setAllData($scope.allData);
          dataService.setSeries($scope.series);
        }
      }
    }

    $scope.getLabels = function (startDate, endDate, interval, format) {

      var dateArray = $scope.getDates(startDate, endDate, interval, format);
      $scope.labels = dateArray;
      dataService.setLabels($scope.labels);
    }

    $scope.setStartDates = function () {
      $scope.fromDate = new Date("04/03/2015");
      $scope.toDate = new Date("04/29/2015");
    }

    Date.prototype.addToDate = function(interval) {
      var date = new Date(this.valueOf());
      var set = "set" + interval;
      var get = "get" + interval;

      date[set](date[get]() + 1);
      return date;
    }

    $scope.switch = function (position, interval) {
      $scope.checkReady();
      angular.forEach(interval, function(type, index) {
        if (position != index)
          type.checked = false;
      });
    }

    $scope.convertDate = function (date, format) {
      var year = String(date.getFullYear())
      var month = String(date.getMonth() + 1)
      var day =  String(date.getDate())
      var time = " 00:00:00"

      var returnDate = year
      + ( format[0] === true ? "-" + ("0" + month).slice(-2) : "")
      + ( format[1] === true ? "-" + ("0" + day).slice(-2) : "")
      + ( format[2] === true ? time : "")

      return returnDate;
    }

    $scope.getDates = function (startDate, endDate, interval, format) {
      var year;
      var month;
      var day;
      var date;
      var result = [];
      var i = 0;

      while (startDate <= endDate) {
        date = $scope.convertDate(startDate, format)
        result.push(date);

        startDate = startDate.addToDate(interval);
      }
      return result;
    }

    $scope.getDifferences = function () {
      $scope.difference = false;
      $scope.dataDifferenceArray = [];
      var i;
      for (i = 0; i < $scope.allData.length ;i++) {
        if ( $scope.series[i] !== "active users") {
          $scope.dataDifferenceArray.push({
            name : $scope.series[i],
            startData : $scope.allData[i][0],
            endData : $scope.allData[i][$scope.labels.length-1],
            differenceData : $scope.allData[i][$scope.labels.length-1] - $scope.allData[i][0]
          })
        }
      }

      if ($scope.dataDifferenceArray.length === 0)
        $scope.difference = true;
    }


    $scope.checkReady = function () {
      var type = _.find($scope.chartstype, {'checked' : true})
      var interval =_.find($scope.interval, {'checked' : true})
      var data =_.find($scope.dataDisplayModel, {'checked' : true})
      var conditionA = (type === undefined || interval === undefined || data === undefined) ? true : false
      var conditionB = ($scope.toDate < $scope.fromDate) ? true : false

      if (conditionA || conditionB) {
        $scope.readyToGo = true;
        if (conditionA && conditionB)
          $scope.infoText = "Select atleast one option in each column and select to date that is after from date";
        else if (conditionA)
          $scope.infoText = "Select atleast one option in each column";
        else if (conditionB)
          $scope.infoText = "Select to date that is after from date";
      }
      else
        $scope.readyToGo = false;
    }

    $scope.setStartDates();
    $scope.buildChart();
  });



