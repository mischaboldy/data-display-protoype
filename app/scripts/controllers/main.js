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

    $scope.getTenants = function () {
      var i;
      var total = 0;

      for (i = 0 ; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
          total += 1
        }
      }
      return total;
    }

    var storedChart;
    var storedData;
    var storedInterval;
    $scope.totalUsers = $scope.getTotals(1);
    $scope.totalTenants = $scope.getTenants();
    $scope.totalSpaces = $scope.getTotals(2);
    $scope.totalCompletions = $scope.getTotals(3);
    $scope.totalChapters = $scope.getTotals(5);
    $scope.readyToGo = false;
    $scope.difference = false;
    $scope.charttype = "lineChart"
    $scope.labels = [];
    $scope.allData = [];
    $scope.series = [];

    $scope.colors = ['#FD1F5E','#1EF9A1','#7FFD1F','#68F000'];
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
      $scope.charttype = _.find($scope.chartstype, {'checked' : true}).partial;
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

    $scope.showTable = function (label) {
      storedChart = _.find($scope.chartstype, {'checked' : true})
      storedData = $scope.dataDisplayModel;
      storedInterval = $scope.interval;
      if (storedChart !== undefined) {
        storedChart.checked = false;
      }
      $scope.tableDifferences = [];
      $scope.tableDifferencesPercentage = [];
      $scope.tableData = $scope.allData[_.indexOf($scope.series, label)];
      $scope.dataLabel = label;
      $scope.charttype = 'table';

      for (var i = 0 ; i < $scope.tableData.length ; i++) {
        $scope.tableDifferences.push($scope.tableData[i] - $scope.tableData[i -1]);
        $scope.tableDifferencesPercentage.push(Math.round(($scope.tableDifferences[i] / $scope.tableData[i]) * 1000) / 1000 + "%");

      }

      $scope.tableDifferences[0] = "not available";
      $scope.tableDifferencesPercentage[0]= "not available";
      $scope.checkReady();
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

    $scope.backToChart = function () {
      storedChart.checked = true;
      $scope.buildChart();
      $scope.dataDisplayModel = storedData;
      $scope.interval = storedInterval;
      $scope.checkReady();
    }

    $scope.setStartDates();
    $scope.buildChart();
  });



