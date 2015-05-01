'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('MainCtrl', function ($scope, dataService, $filter) {

    $scope.dataList = dataService.getData()

    console.log($scope.dataList)


    $scope.getTotals = function (key) {
      var i;
      var total = 0;

      for (i = 0 ; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
          total += parseInt($scope.dataList.values[i][key])
        }
      }
      return total;
    }

    $scope.getTennants = function () {
      var i;
      var total = 0;

      for (i = 0 ; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
          total += 1
        }
      }
      return total;
    }

    $scope.totalUsers = $scope.getTotals(1);
    $scope.totalTennants = $scope.getTennants();
    $scope.totalSpaces = $scope.getTotals(2);
    $scope.totalCompletions = $scope.getTotals(3);
    $scope.totalChapters = $scope.getTotals(5);

    $scope.charttype = "lineChart"
    $scope.labels = [];
    $scope.allData = [];
    $scope.series = [];

    $scope.dataDisplayModel = [{
        name : "users",
        field : "users",
        checked : true
      }, {
        name : "active users",
        field : "active_users",
        checked : false
      }, {
        name : "completions",
        field : "completions",
        checked : false
      }, {
        name : "spaces",
        field : "spaces",
        checked : false
      }, {
        name : "chapters",
        field : "chapters",
        checked : false
    }];

    $scope.interval = [{
        name : "day",
        action : "Date",
        format : [true, true, false],
        checked : true
      }, {
        name : "month",
        action : "Month",
        format : [true, false, false],
        checked : false
      }, {
        name : "year",
        action : "FullYear",
        format : [false, false, false],
        checked : false
    }];

    $scope.chartstype = [{
        name : 'line chart',
        partial : 'lineChart',
        checked : true
      }, {
        name : 'bar chart',
        partial : 'barChart',
        checked : false
      }];

    $scope.buildChart = function () {
      var interval = _.result(_.find($scope.interval, { 'checked' : true }) , 'action')
      var format = _.result(_.find($scope.interval, { 'checked' : true }) , 'format')
      $scope.getChart();
      $scope.getData($scope.fromDate, $scope.toDate, interval, [true, true, true]);
      $scope.getLabels($scope.fromDate, $scope.toDate, interval, format);
      $scope.getDifferences();
    }

    $scope.getChart = function() {
      if ($scope.chartstype[0].checked) {
        $scope.charttype = $scope.chartstype[0].partial
      }
      if ($scope.chartstype[1].checked) {
        $scope.charttype = $scope.chartstype[1].partial
      }
    }

    $scope.getData = function(startDate, endDate, interval, format) {

      $scope.series.length = 0
      $scope.allData.length = 0

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
        }
      }
    }

    $scope.getLabels = function (startDate, endDate, interval, format) {

      var dateArray = $scope.getDates(startDate, endDate, interval, format);
      $scope.labels = dateArray;
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

      $scope.dataDifferenceArray = [];
      var i;
      for (i = 0; i < $scope.allData.length ;i++) {
        $scope.dataDifferenceArray.push({
          name : $scope.series[i],
          startData : $scope.allData[i][0],
          endData : $scope.allData[i][$scope.labels.length-1],
          differenceData : $scope.allData[i][$scope.labels.length-1] - $scope.allData[i][0]
        })
      }
    }


    $scope.setStartDates();
    $scope.buildChart();
  });



