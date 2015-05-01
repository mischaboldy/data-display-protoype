angular.module('DataDisplayPrototypeApp')
  .controller('usersController', function ($scope) {

  });
//     var randomArray1;
//     var randomArray2;
//     var randomArray3;
//     var randomArray4;
//     var randomArray5;
//     var randomArray6;
//     var randomArray7;
//     var randomArray8;
//     var randomArray9;
//     var randomArray10;
//     $scope.charttype = "lineChart"
//     $scope.labels = [];
//     $scope.allData = [];
//     $scope.series = [];
//     $scope.dataDisplayModel = [{
//         name : "total",
//         checked : true
//       }, {
//         name : "active users",
//         checked : true
//       }, {
//         name : "completions per user",
//         checked : true
//       }, {
//         name : "points per user",
//         checked : true
//       }, {
//         name : "time spent per user",
//         checked : true
//       }, {
//         name : "total",
//         checked : true
//       }, {
//         name : "total",
//         checked : true
//       }, {
//     }];

//     $scope.interval = [{
//         name : "day",
//         checked : true
//       }, {
//         name : "month",
//         checked : false
//       }, {
//         name : "year",
//         checked : false
//     }];

//     $scope.chartstype = [{
//         name : 'line chart',
//         partial : 'lineChart',
//         checked : true
//       }, {
//         name : 'bar chart',
//         partial : 'barChart',
//         checked : false
//       }];

//     $scope.dataDifferenceArray = []

//     $scope.buildChart = function () {
//       $scope.getChart();
//       $scope.getData();
//       $scope.getLabels();
//       $scope.getDifferences();
//     }

//     $scope.getChart = function() {
//       if ($scope.chartstype[0].checked) {
//         $scope.charttype = $scope.chartstype[0].partial
//       }
//       if ($scope.chartstype[1].checked) {
//         $scope.charttype = $scope.chartstype[1].partial
//       }
//     }

//     $scope.sortData = function() {
//       var fields = $scope.dataList.fields;
//       var values = $scope.dataList.values;
//       var result = {};
//       for (var j = 0; j < values.length; j++) {
//           if (!result.hasOwnProperty(values[j][fields.length - 1]))
//                   result[values[j][fields.length - 1]] = {};
//           for (var i = 1; i < fields.length - 1; i++) {
//               if (!result[values[j][fields.length - 1]][fields[i]])
//                   result[values[j][fields.length - 1]][fields[i]] = parseInt(values[j][i], 10);
//               else
//                   result[values[j][fields.length - 1]][fields[i]] += parseInt(values[j][i], 10);
//           }
//       }
//       return result
//     }

//     var dataList = $scope.sortData();
//     console.log(dataList);

//     $scope.getData = function() {
//       $scope.series.length = 0
//       $scope.allData.length = 0
//       var dataArray = [];
//       var dateArray = ["2015-04-03 00:00:00", "2015-04-04 00:00:00", "2015-04-05 00:00:00", "2015-04-06 00:00:00", "2015-04-07 00:00:00"]

//       var filteredDates = $filter('filter')(dataList, function (input, startDate, endDate) {
//         // filter out selected dates!!!!
//       });
//       for (var i = 0 ; i < $scope.dataDisplayModel.length ; i++) {
//         if ($scope.dataDisplayModel[i].checked === true) {
//           dataArray = _.pluck(filteredDates, $scope.dataDisplayModel[i].field)
//           $scope.allData.push(dataArray);
//           $scope.series.push($scope.dataDisplayModel[i].name);
//         }
//       }
//     }

//     $scope.randomArray = function(key) {
//       var array = [];

//       for (var i = 0, l = 50; i < l; i++) {
//         array.push(Math.round(Math.random() * 200) + key)
//       }
//       array.sort(function compareNumbers(a, b) {return a - b;});
//       return array;
//     }

//     $scope.getLabels = function () {

//       var dateArray = new Array();
//       var fromDate = $scope.fromDate;
//       var toDate = $scope.toDate;

//       while (fromDate <= toDate) {
//         dateArray.push( new Date(fromDate).toFormattedString())
//         fromDate = fromDate.addToDate();
//       }
//       $scope.labels = dateArray;
//     }

//     $scope.setStartDates = function () {
//       $scope.fromDate = new Date();
//       $scope.fromDate.setDate($scope.fromDate.getDate() - 7)
//       $scope.toDate = new Date();
//     }

//     Date.prototype.addToDate = function() {
//       var date = new Date(this.valueOf())
//       if ($scope.interval[0].checked === true) {
//        date.setDate(date.getDate() + 1);
//       }
//       if ($scope.interval[1].checked === true) {
//         date.setMonth(date.getMonth() + 1);
//       }
//       if ($scope.interval[2].checked === true) {
//         date.setFullYear(date.getFullYear() + 1);
//       }
//       return date;
//     }

//     Date.prototype.toFormattedString = function () {
//       var string = []
//       if ($scope.interval[0].checked === true) {
//         string = [String(this.getDate()) + "-" +
//                   String(this.getMonth()) + "-" +
//                   String(this.getFullYear())];
//       }
//       if ($scope.interval[1].checked === true) {
//         string = [String(this.getMonth()) + "-" +
//                   String(this.getFullYear())];
//       }
//       if ($scope.interval[2].checked === true) {
//         string = [String(this.getFullYear())];
//       }
//       return string;
//     };

//     $scope.switch = function (position, interval) {
//       angular.forEach(interval, function(type, index) {
//         if (position != index)
//           type.checked = false;
//       });
//     }

//     $scope.setArrays = function () {
//       randomArray1 = $scope.randomArray(9);
//       randomArray2 = $scope.randomArray(19);
//       randomArray3 = $scope.randomArray(1);
//       randomArray4 = $scope.randomArray(-20);
//       randomArray5 = $scope.randomArray(-13);
//       randomArray6 = $scope.randomArray(35);
//       randomArray7 = $scope.randomArray(-27);
//     }

//     $scope.getDifferences = function () {

//       $scope.dataDifferenceArray.length = 0;
//       var i;
//       for (i = 0; i < $scope.allData.length ;i++) {
//         $scope.dataDifferenceArray.push({
//           name : $scope.series[i],
//           startData : $scope.allData[i][0],
//           endData : $scope.allData[i][$scope.labels.length-1],
//           differenceData : $scope.allData[i][$scope.labels.length-1] - $scope.allData[i][0]
//         })
//       }
//     }

//     $scope.setStartDates();
//     $scope.setArrays();
//     $scope.buildChart();
//   });


// $scope.dataList = dataService.getData()

//     console.log($scope.dataList)


//     $scope.getTotals = function (key) {
//       var i;
//       var total = 0;

//       for (i = 0 ; i < $scope.dataList.values.length ; i++) {
//         if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
//           total += parseInt($scope.dataList.values[i][key])
//         }
//       }
//       return total;
//     }

//     $scope.getTennants = function () {
//       var i;
//       var total = 0;

//       for (i = 0 ; i < $scope.dataList.values.length ; i++) {
//         if ($scope.dataList.values[i][6] === "2015-04-29 00:00:00") {
//           total += 1
//         }
//       }
//       return total;
//     }

//     $scope.totalUsers = $scope.getTotals(1);
//     $scope.totalTennants = $scope.getTennants();
//     $scope.totalSpaces = $scope.getTotals(2);
//     $scope.totalCompletions = $scope.getTotals(3);
//     $scope.totalActiveUsers = $scope.getTotals(4);
//     $scope.totalChapters = $scope.getTotals(5);

//     // console.log($scope.totalUsers)
//     var randomArray1;
//     var randomArray2;
//     var randomArray3;
//     var randomArray4;
//     var randomArray5;
//     var randomArray6;
//     var randomArray7;
//     var randomArray8;
//     var randomArray9;
//     var randomArray10;
//     $scope.charttype = "lineChart"
//     $scope.labels = [];
//     $scope.allData = [];
//     $scope.series = [];
//     var sumBuild = [];
//     var valueBuild = [];
//     $scope.dataDisplayModel = [{
//         name : "users",
//         checked : true
//       }, {
//         name : "active users",
//         checked : true
//       }, {
//         name : "super users",
//         checked : true
//       }, {
//         name : "completions",
//         checked : false
//       }, {
//         name : "paths",
//         checked : false
//       }, {
//         name : "chapters",
//         checked : false
//       }, {
//         name : "tennants",
//         checked : false
//     }];

//     $scope.interval = [{
//         name : "day",
//         checked : true
//       }, {
//         name : "month",
//         checked : false
//       }, {
//         name : "year",
//         checked : false
//     }];

//     $scope.chartstype = [{
//         name : 'line chart',
//         partial : 'lineChart',
//         checked : true
//       }, {
//         name : 'bar chart',
//         partial : 'barChart',
//         checked : false
//       }];

//     $scope.dataDifferenceArray = []

//     $scope.buildChart = function () {
//       $scope.getChart();
//       $scope.getData();
//       $scope.getLabels();
//       $scope.getDifferences();
//     }

//     $scope.getChart = function() {
//       if ($scope.chartstype[0].checked) {
//         $scope.charttype = $scope.chartstype[0].partial
//       }
//       if ($scope.chartstype[1].checked) {
//         $scope.charttype = $scope.chartstype[1].partial
//       }
//     }

//     $scope.getData = function() {

//       var users = $scope.dataDisplayModel[0].checked;
//       var activeUsers = $scope.dataDisplayModel[1].checked;
//       var tennants = $scope.dataDisplayModel[2].checked;
//       var completions = $scope.dataDisplayModel[3].checked;
//       var paths = $scope.dataDisplayModel[4].checked;
//       var chapters = $scope.dataDisplayModel[5].checked;
//       var superUsers = $scope.dataDisplayModel[6].checked;
//       $scope.allData = [];
//       $scope.series = [];
//       if (users === true) {
//         $scope.allData.push(randomArray1);
//         $scope.series.push("users");
//       }
//       if (activeUsers === true) {
//         $scope.allData.push(randomArray2);
//         $scope.series.push("active users");
//       }
//       if (tennants === true) {
//         $scope.allData.push(randomArray3);
//         $scope.series.push("tennants");
//       }
//       if (completions === true) {
//         $scope.allData.push(randomArray4);
//         $scope.series.push("completions");
//       }
//       if (paths === true) {
//         $scope.allData.push(randomArray5);
//         $scope.series.push("paths");
//       }
//       if (chapters === true) {
//         $scope.allData.push(randomArray6);
//         $scope.series.push("chapters");
//       }
//       if (superUsers === true) {
//         $scope.allData.push(randomArray7);
//         $scope.series.push("super users");
//       }
//     }

//     $scope.randomArray = function() {
//       var array = [];

//       for (var i = 0, l = 50; i < l; i++) {
//         array.push(Math.round(Math.random() * 200))
//       }
//       return array;
//     }

//     $scope.getLabels = function () {

//       var dateArray = new Array();
//       var fromDate = $scope.fromDate;
//       var toDate = $scope.toDate;

//       while (fromDate <= toDate) {
//         dateArray.push( new Date(fromDate).toFormattedString())
//         fromDate = fromDate.addToDate();
//       }
//       $scope.labels = dateArray;
//     }



//     $scope.setStartDates = function () {
//       $scope.fromDate = new Date();
//       $scope.fromDate.setDate($scope.fromDate.getDate() - 7)
//       $scope.toDate = new Date();
//     }

//     Date.prototype.addToDate = function() {
//       var date = new Date(this.valueOf())
//       if ($scope.interval[0].checked === true) {
//        date.setDate(date.getDate() + 1);
//       }
//       if ($scope.interval[1].checked === true) {
//         date.setMonth(date.getMonth() + 1);
//       }
//       if ($scope.interval[2].checked === true) {
//         date.setFullYear(date.getFullYear() + 1);
//       }
//       return date;
//     }

//     Date.prototype.toFormattedString = function () {
//       var string = []
//       if ($scope.interval[0].checked === true) {
//         string = [String(this.getDate()) + "-" +
//                   String(this.getMonth()) + "-" +
//                   String(this.getFullYear())];
//       }
//       if ($scope.interval[1].checked === true) {
//         string = [String(this.getMonth()) + "-" +
//                   String(this.getFullYear())];
//       }
//       if ($scope.interval[2].checked === true) {
//         string = [String(this.getFullYear())];
//       }
//       return string;
//     };

//     $scope.switch = function (position, interval) {
//       angular.forEach(interval, function(type, index) {
//         if (position != index)
//           type.checked = false;
//       });
//     }

//     $scope.setArrays = function () {
//       randomArray1 = $scope.randomArray();
//       randomArray2 = $scope.randomArray();
//       randomArray3 = $scope.randomArray();
//       randomArray4 = $scope.randomArray();
//       randomArray5 = $scope.randomArray();
//       randomArray6 = $scope.randomArray();
//       randomArray7 = $scope.randomArray();
//     }

//     $scope.getDifferences = function () {

//       $scope.dataDifferenceArray.length = 0;
//       var i;
//       for (i = 0; i < $scope.allData.length ;i++) {
//         $scope.dataDifferenceArray.push({
//           name : $scope.series[i],
//           startData : $scope.allData[i][0],
//           endData : $scope.allData[i][$scope.labels.length-1],
//           differenceData : $scope.allData[i][$scope.labels.length-1] - $scope.allData[i][0]
//         })
//       }
//     }

//     $scope.onClick = function (points, evt) {
//       // console.log(points, evt);
//       if (points.length > 0){

//         var i;
//         $scope.dataArray = [];
//         for (i = 0 ; i < points.length ; i++) {
//           $scope.dataArray.push({ name : points[i].datasetLabel, value : points[i].value });
//         }

//         // console.log($scope.dataArray[0]);
//         // console.log($scope.dataArray[0].value);
//         // $scope.totalUsers = dataArray[0].value;
//         // console.log(points[0].datasetLabel)
//         // console.log(points[0].value)
//       }
//     };

//     $scope.sumBuild = function (key, value) {
//       if (key === "clear") {
//          sumBuild.length = 0;
//          valueBuild.length = 0;
//       }
//       else if (key === "=") {
//         sumBuild.push(key);
//         sumBuild.push( $scope.solve(valueBuild) );
//       }
//       else {
//         // console.log(key);
//         if (value === 0)
//         {
//           valueBuild.push(key);
//         }
//         else {
//           valueBuild.push(value);
//         }

//         sumBuild.push(key);
//       }
//       $scope.sum = sumBuild.join(" ");

//     }

//     $scope.solve = function (key) {
//       // console.log(key)
//       var answer = key;

//       // angular.forEach(key, function(index) {
//       //   if (key[index] === "per") {
//       //     key[index-1] / key[index+1];
//       //   }
//       // })
//       var i;
//       // var a;
//       for (i = 0 ; i < key.length ; i++) {

//         if (key[i] === "per") {
//           key[i+1] = key[i-1] / key[i+1];
//         }
//         // console.log(a);
//       }
//       // console.log(key[])
//       answer = key[key.length-1]
//       return answer;
//     }

//     $scope.setStartDates();
//     $scope.setArrays();
//     $scope.buildChart();
//   });



