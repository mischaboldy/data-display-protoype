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

    $scope.labels = [];
    $scope.allData = [];
    $scope.dataDisplayModel = {
      value1 : true,
      value2 : false,
      value3 : false,
      value4 : false,
      value5 : false,
      value6 : false,
      value7 : false,
      value8 : false,
      value9 : false,
      value10 : false
    };
    $scope.interval = [{
        name : "day",
        checked : true
      }, {
        name : "month",
        checked : false
      }, {
        name : "year",
        checked : false
    }]

    $scope.buildChart = function () {
      $scope.getData();
      $scope.getLabels();

    }

    $scope.getData = function() {

      var users = $scope.dataDisplayModel.value1;
      var activeUsers = $scope.dataDisplayModel.value2;
      var tennants = $scope.dataDisplayModel.value3;
      var completions = $scope.dataDisplayModel.value4;
      var paths = $scope.dataDisplayModel.value5;
      var chapters = $scope.dataDisplayModel.value6;
      var x1 = $scope.dataDisplayModel.value7;
      var x2 = $scope.dataDisplayModel.value8;
      var x3 = $scope.dataDisplayModel.value9;
      var x4 = $scope.dataDisplayModel.value10;
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
      if (x1 === true) {
        $scope.allData.push(randomArray7);
        $scope.series.push("x1");
      }
      if (x2 === true) {
        $scope.allData.push(randomArray8);
        $scope.series.push("x2");
      }
      if (x3 === true) {
        $scope.allData.push(randomArray9);
        $scope.series.push("x3");
      }
      if (x4 === true) {
        $scope.allData.push(randomArray10);
        $scope.series.push("x4");
      }

      // console.log($scope.allData)
      // if (users === false && activeUsers === false && tennants === false) {
      // }

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
      randomArray8 = $scope.randomArray();
      randomArray9 = $scope.randomArray();
      randomArray10 = $scope.randomArray();
    }


    $scope.setStartDates();
    $scope.setArrays();
    $scope.buildChart();
  });
