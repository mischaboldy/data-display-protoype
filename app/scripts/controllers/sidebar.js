angular.module('DataDisplayPrototypeApp')
  .controller('RightSidebarController', function ($scope, dataService, dataModels) {
    $scope.dataList = dataService.getData();

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



    $scope.totalUsers = $scope.getTotals(1);
    $scope.totalTenants = $scope.getTenants();
    $scope.totalSpaces = $scope.getTotals(2);
    $scope.totalCompletions = $scope.getTotals(3);
    $scope.totalChapters = $scope.getTotals(5);

    dataService.setTotalUsers($scope.totalUsers);
    dataService.setTotalSpaces($scope.totalSpaces);
    dataService.setTotalChapters($scope.totalChapters);
    dataService.setTotalCompletions($scope.totalCompletions);
  });

