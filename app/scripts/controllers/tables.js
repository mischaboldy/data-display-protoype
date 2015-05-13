angular.module('DataDisplayPrototypeApp')
  .controller('TablesController', function ($scope, dataModels, $filter, dataService, $routeParams) {

    var placeHolder = "select tenant"
    $scope.tenantAmount = 10;
    $scope.allData = dataService.getAllData();
    $scope.series = dataService.getSeries();
    $scope.labels = dataService.getLabels();
    $scope.dataList = dataService.getData();
    $scope.tableName = $routeParams.name;
    $scope.generalDataDisplay = true;
    $scope.compareDataDisplay = false;


    $scope.loginData = [[
    0, 0, 2, 2, 3, 4, 6, 7, 8, 10, 11, 9, 7, 5, 3, 6, 4, 5, 3, 2, 2, 1, 0, 0]];

    $scope.loginLabels = [
      "00:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00",
      "04:00 - 05:00", "05:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00",
      "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
      "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
      "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00",
      "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 00:00"
    ];
    $scope.loginSeries = ["logins in percentages"]

    $scope.loginOptions = {
      scaleLabel: function (valuePayload) {
        return valuePayload.value + "%";

      }
    };

    var totalUsers = dataService.getTotalUsers();
    var totalSpaces = dataService.getTotalSpaces();
    var totalCompletions = dataService.getTotalCompletions();
    var totalChapters = dataService.getTotalChapters();

    $scope.avgSpaces = Math.round((totalUsers / totalSpaces) * 100) / 100;
    $scope.avgChapters = Math.round((totalUsers / totalChapters) * 100) / 100;
    $scope.avgCompletions = Math.round((totalUsers / totalCompletions) * 100) / 100;
    $scope.avgPoints = 45;

    $scope.showTable = function () {
      $scope.tableDifferences = [];
      $scope.tableDifferencesPercentage = [];
      $scope.tableData = $scope.allData[_.indexOf($scope.series, $scope.tableName)];
      $scope.dataLabel = $scope.tableName;

      for (var i = 0 ; i < $scope.tableData.length ; i++) {
        $scope.tableDifferences.push($scope.tableData[i] - $scope.tableData[i -1]);
        $scope.tableDifferencesPercentage.push(Math.round(($scope.tableDifferences[i] / $scope.tableData[i]) * 1000) / 1000 + "%");
      }
      $scope.tableDifferences[0] = "-";
      $scope.tableDifferencesPercentage[0]= "-";
    }

    $scope.getTenantList = function () {
      var tenantArray = []
      for (var i = 0; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00"){
          tenantArray.push({
            text : _.first($scope.dataList.values[i])
          })
        }
      }

      tenantArray.sort(function(a, b){
        if(a.text < b.text) return -1;
        if(a.text > b.text) return 1;
        return 0;
      })
      return tenantArray;
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

    $scope.showGeneralData = function () {
      $scope.ddSelectSelected.text = placeHolder;
      $scope.ddSelectSelectedCompare.text = placeHolder;
      $scope.compareDataDisplay = false;
    }

    $scope.getSingleData = function () {
      $scope.tenantInfo = [];
      var avCompletions;
      var avChapters;
      var avSpaces;
      var randomNr = 2;
      for (var i = 0; i < $scope.dataList.values.length ; i++) {
        if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
          avCompletions = Math.round( ($scope.dataList.values[i][3] / $scope.dataList.values[i][1]) *100 ) / 100 ;
          avChapters = Math.round( ($scope.dataList.values[i][5] / $scope.dataList.values[i][1]) *100 ) / 100 ;
          avSpaces = Math.round( ($scope.dataList.values[i][2] / $scope.dataList.values[i][1]) *100 ) / 100 ;

          $scope.tenantInfo.push({
            name : $scope.dataList.values[i][0],
            avgCompletions : avCompletions,
            avgPoints : randomNr,
            avgChapters : avChapters,
            avgSpaces : avSpaces
          })
        }
      }
    }

    $scope.showSingleData = function () {
      var tenantMainName = $scope.ddSelectSelected.text;
      var tenantCompareName = $scope.ddSelectSelectedCompare.text;
      $scope.tenantStats = [];
      var tenantMain = $filter('filter')($scope.tenantInfo, {name : tenantMainName}, true)[0]
      var tenantCompare = $filter('filter')($scope.tenantInfo, {name : tenantCompareName}, true)[0]

      $scope.tenantStats.push(tenantMain)
      $scope.tenantStats.push(tenantCompare)
    }


    //["tenant_name","users","spaces","completions","active_users","chapters","date"

    if ($scope.tableName !== "active users")
      $scope.getTenantData();

    $scope.showTable();
    $scope.ddSelectOptions = $scope.getTenantList();
    $scope.ddSelectSelected = { text : placeHolder}; // Must be an object
    $scope.ddSelectSelectedCompare = { text : placeHolder};
    $scope.getSingleData();

    $scope.$watch("ddSelectSelected", function(newVal){
      if (newVal.text === placeHolder)
        $scope.generalDataDisplay = true;
      else {
        $scope.generalDataDisplay = false;
        $scope.showSingleData();
      }
    },true);

     $scope.$watch("ddSelectSelectedCompare", function(newVal){
        if (newVal.text !== placeHolder)
          $scope.compareDataDisplay = true;
        $scope.showSingleData();
      },true);

  });
