'use strict';
angular.module('DataDisplayPrototypeApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pages/main.html',
        controller: 'MainCtrl'
      })
      .when('/chart-test', {
        templateUrl: 'views/pages/chart-test.html',
        controller: 'ChartController'
      })
      .when('/firebase-test', {
        templateUrl: 'views/pages/firebase-test.html',
        controller: 'FirebaseController'
      })
      .when('/search', {
        templateUrl: 'views/pages/search.html',
        controller: 'SearchController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
