'use strict';
angular.module('DataDisplayPrototypeApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'chart.js',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pages/main.html',
        controller: 'MainCtrl'
      })
      .when('/chart-test', {
        templateUrl: 'views/pages/chart-test.html',
        controller: 'ChartCtrl'
      })
      .when('/firebase-test', {
        templateUrl: 'views/pages/firebase-test.html',
        controller: 'firebaseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
