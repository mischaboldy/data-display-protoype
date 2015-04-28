'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('MainCtrl', function ($scope) {


    var randomArray1;
    var randomArray2;
    var randomArray3;
    var randomArray4;
    var randomArray5;
    var randomArray6;
    var randomArray7;
    var randomArray8;
    var randomArray9;
    var randomArray10;
    $scope.charttype = "lineChart"
    $scope.labels = [];
    $scope.allData = [];
    $scope.series = [];
    $scope.dataDisplayModel = [{
        name : "users",
        checked : true
      }, {
        name : "active users",
        checked : false
      }, {
        name : "super users",
        checked : false
      }, {
        name : "completions",
        checked : false
      }, {
        name : "paths",
        checked : false
      }, {
        name : "chapters",
        checked : false
      }, {
        name : "tennants",
        checked : false
    }];

    $scope.interval = [{
        name : "day",
        checked : true
      }, {
        name : "month",
        checked : false
      }, {
        name : "year",
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

    $scope.dataDifferenceArray = []

    $scope.buildChart = function () {
      $scope.getChart();
      $scope.getData();
      $scope.getLabels();
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

    $scope.getData = function() {

      var users = $scope.dataDisplayModel[0].checked;
      var activeUsers = $scope.dataDisplayModel[1].checked;
      var tennants = $scope.dataDisplayModel[2].checked;
      var completions = $scope.dataDisplayModel[3].checked;
      var paths = $scope.dataDisplayModel[4].checked;
      var chapters = $scope.dataDisplayModel[5].checked;
      var superUsers = $scope.dataDisplayModel[6].checked;
      $scope.allData = [];
      $scope.series = [];
      if (users === true) {
        $scope.allData.push(randomArray1);
        $scope.series.push("users");
      }
      if (activeUsers === true) {
        $scope.allData.push(randomArray2);
        $scope.series.push("activeUsers");
      }
      if (tennants === true) {
        $scope.allData.push(randomArray3);
        $scope.series.push("tennants");
      }
      if (completions === true) {
        $scope.allData.push(randomArray4);
        $scope.series.push("completions");
      }
      if (paths === true) {
        $scope.allData.push(randomArray5);
        $scope.series.push("paths");
      }
      if (chapters === true) {
        $scope.allData.push(randomArray6);
        $scope.series.push("chapters");
      }
      if (superUsers === true) {
        $scope.allData.push(randomArray7);
        $scope.series.push("super users");
      }
    }

    $scope.randomArray = function() {
      var array = [];

      for (var i = 0, l = 50; i < l; i++) {
        array.push(Math.round(Math.random() * 200))
      }
      return array;
    }

    $scope.getLabels = function () {

      var dateArray = new Array();
      var fromDate = $scope.fromDate;
      var toDate = $scope.toDate;

      while (fromDate <= toDate) {
        dateArray.push( new Date(fromDate).toFormattedString())
        fromDate = fromDate.addToDate();
      }
      $scope.labels = dateArray;
    }



    $scope.setStartDates = function () {
      $scope.fromDate = new Date();
      $scope.fromDate.setDate($scope.fromDate.getDate() - 7)
      $scope.toDate = new Date();
    }

    Date.prototype.addToDate = function() {
      var date = new Date(this.valueOf())
      if ($scope.interval[0].checked === true) {
       date.setDate(date.getDate() + 1);
      }
      if ($scope.interval[1].checked === true) {
        date.setMonth(date.getMonth() + 1);
      }
      if ($scope.interval[2].checked === true) {
        date.setFullYear(date.getFullYear() + 1);
      }
      return date;
    }

    Date.prototype.toFormattedString = function () {
      var string = []
      if ($scope.interval[0].checked === true) {
        string = [String(this.getDate()) + "-" +
                  String(this.getMonth()) + "-" +
                  String(this.getFullYear())];
      }
      if ($scope.interval[1].checked === true) {
        string = [String(this.getMonth()) + "-" +
                  String(this.getFullYear())];
      }
      if ($scope.interval[2].checked === true) {
        string = [String(this.getFullYear())];
      }
      return string;
    };

    $scope.switch = function (position, interval) {
      angular.forEach(interval, function(type, index) {
        if (position != index)
          type.checked = false;
      });
    }

    $scope.setArrays = function () {
      randomArray1 = $scope.randomArray();
      randomArray2 = $scope.randomArray();
      randomArray3 = $scope.randomArray();
      randomArray4 = $scope.randomArray();
      randomArray5 = $scope.randomArray();
      randomArray6 = $scope.randomArray();
      randomArray7 = $scope.randomArray();
    }

    $scope.getDifferences = function () {

      $scope.dataDifferenceArray.length = 0;
      var i;
      for (i = 0; i < $scope.allData.length ;i++) {
        $scope.dataDifferenceArray.push({
          name : $scope.series[i],
          startData : $scope.allData[i][0],
          endData : $scope.allData[i][$scope.labels.length-1],
          differenceData : $scope.allData[i][$scope.labels.length-1] - $scope.allData[i][0]
        })
      }
      console.log($scope.dataDifferenceArray)
    }



    $scope.setStartDates();
    $scope.setArrays();
    $scope.buildChart();
  });


/// word search!!
