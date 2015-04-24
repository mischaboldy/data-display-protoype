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
    $scope.dataDisplayModel = [{
        name : "active users",
        checked : true
      }, {
        name : "tennants",
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
        name : "x",
        checked : false
      }, {
        name : "x",
        checked : false
      }, {
        name : "x",
        checked : false
      }, {
        name : "x",
        checked : false
      }, {
        name : "x",
        checked : false
    }];

    // {
    //   checked : true,
    //   value2 : false,
    //   value3 : false,
    //   value4 : false,
    //   value5 : false,
    //   value6 : false,
    //   value7 : false,
    //   value8 : false,
    //   value9 : false,
    //   value10 : false
    // };
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


    $scope.getPartial = function () {
      var x  = 'views/partials/' + $scope.charttype + '.html'
      console.log(x)
      return 'views/partials/' + $scope.charttype + '.html'
    }
    $scope.buildChart = function () {
      $scope.getChart();
      $scope.getData();
      $scope.getLabels();
      $scope.getPartial();
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
      var x1 = $scope.dataDisplayModel[6].checked;
      var x2 = $scope.dataDisplayModel[7].checked;
      var x3 = $scope.dataDisplayModel[8].checked;
      var x4 = $scope.dataDisplayModel[9].checked;
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
