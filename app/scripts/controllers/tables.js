angular.module('DataDisplayPrototypeApp')
  .controller('TablesController', function ($scope, dataModels, $filter, dataService) {

    $scope.tenantAmount = 10;
    $scope.allData = dataService.getAllData();
    $scope.series = dataService.getSeries();
    $scope.labels = dataService.getLabels();
    $scope.dataList = dataService.getData();

    $scope.showTable = function () {

      $scope.tableDifferences = [];
      $scope.tableDifferencesPercentage = [];
      $scope.tableData = $scope.allData[_.indexOf($scope.series, "users")];
      $scope.dataLabel = "users";

      for (var i = 0 ; i < $scope.tableData.length ; i++) {
        $scope.tableDifferences.push($scope.tableData[i] - $scope.tableData[i -1]);
        $scope.tableDifferencesPercentage.push(Math.round(($scope.tableDifferences[i] / $scope.tableData[i]) * 1000) / 1000 + "%");

      }

      $scope.tableDifferences[0] = "not available";
      $scope.tableDifferencesPercentage[0]= "not available";

    }

    $scope.getTenantData = function () {
      var tenants = []
      var users = []
      var tenantArray = []
      var userSum = 0;
      var highestSum = 0;

      for (var i = 0; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00"){
          tenantArray.push({
            name : _.first($scope.dataList.values[i]),
            users : parseInt($scope.dataList.values[i][1])
          })
          userSum += parseInt($scope.dataList.values[i][1])
        }
      }
      var highestUsers =  _.take($filter('orderBy')(tenantArray, 'users', true), $scope.tenantAmount);
      for (var j = 0; j < $scope.tenantAmount ; j++) {
          tenants.push(highestUsers[j].name)
          users.push(highestUsers[j].users)
          highestSum += highestUsers[j].users;
      }
      userSum -= highestSum

      tenants.push('other');
      users.push(userSum)

      $scope.tenantData = users;
      $scope.tenantLabels = tenants;
    }


    $scope.getTenantData();
    $scope.showTable();
  });
