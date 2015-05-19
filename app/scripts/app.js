'use strict';
angular.module('DataDisplayPrototypeApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'chart.js',
    'ngDropdowns',
    'nvd3ChartDirectives'
  ])
  .config(function ($routeProvider, $locationProvider) {
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
      .when('/tables/:name', {
        templateUrl: 'views/pages/tables.html',
        controller: 'TablesController'
      })
      .when('/projections', {
        templateUrl: 'views/pages/projections.html',
        controller: 'ProjectionsController'
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });
