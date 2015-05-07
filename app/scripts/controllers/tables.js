angular.module('DataDisplayPrototypeApp')
  .controller('TablesController', function ($scope, dataModels, $filter, dataService, $routeParams) {

    $scope.tenantAmount = 10;
    $scope.allData = dataService.getAllData();
    $scope.series = dataService.getSeries();
    $scope.labels = dataService.getLabels();
    $scope.dataList = dataService.getData();
    $scope.tableName = $routeParams.name;

    $scope.loginData = [
    0, 0, 2, 2, 3, 4, 6, 7, 8, 10, 11, 9, 7, 5, 3, 6, 4, 5, 3, 2, 2, 1, 0, 0];

    $scope.loginLabels = [
      "00:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00",
      "04:00 - 05:00", "05:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00",
      "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
      "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
      "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00",
      "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 00:00"
    ];

    $scope.showTable = function () {
      $scope.tableDifferences = [];
      $scope.tableDifferencesPercentage = [];
      $scope.tableData = $scope.allData[_.indexOf($scope.series, $scope.tableName)];
      $scope.dataLabel = $scope.tableName;

      for (var i = 0 ; i < $scope.tableData.length ; i++) {
        $scope.tableDifferences.push($scope.tableData[i] - $scope.tableData[i -1]);
        $scope.tableDifferencesPercentage.push(Math.round(($scope.tableDifferences[i] / $scope.tableData[i]) * 1000) / 1000 + "%");
      }
      $scope.tableDifferences[0] = "not available";
      $scope.tableDifferencesPercentage[0]= "not available";
    }

    $scope.getTenantData = function () {
      var tenants = []
      var values = []
      var tenantArray = []
      var userSum = 0;
      var highestSum = 0;
      var field = $scope.dataList.fields.indexOf($scope.tableName);

      for (var i = 0; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00"){
          tenantArray.push({
            name : _.first($scope.dataList.values[i]),
            value : parseInt($scope.dataList.values[i][field])
          })
          userSum += parseInt($scope.dataList.values[i][field])
        }
      }

      var highestValues =  _.take($filter('orderBy')(tenantArray, 'value', true), $scope.tenantAmount);
      for (var j = 0; j < $scope.tenantAmount ; j++) {
          tenants.push(highestValues[j].name)
          values.push(highestValues[j].value)
          highestSum += highestValues[j].value;
      }
      userSum -= highestSum

      tenants.push('other');
      values.push(userSum)

      $scope.tenantData = values;
      $scope.tenantLabels = tenants;
    }

    if ($scope.tableName !== "active users")
      $scope.getTenantData();

    $scope.showTable();
  });
