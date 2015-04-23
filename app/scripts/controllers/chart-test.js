'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('ChartController', function ($scope) {

    $scope.randomize = function () {
      var count;
      var numbers = [];
      for(count = 0; count <7; count++) {
        numbers.push(Math.floor(Math.random()*100))
      }
      $scope.data1 = [numbers];
      $scope.data2 = numbers;
    }

    $scope.labels1 = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];

    $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data2 = [300, 500, 100, 40, 120];
    $scope.type = 'PolarArea';

    $scope.randomize();
  });
