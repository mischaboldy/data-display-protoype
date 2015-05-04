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
      .when('/users', {
        templateUrl: 'views/pages/users.html',
        controller: 'usersController'
      })
      .when('/tenants', {
        templateUrl: 'views/pages/tenants.html',
        controller: 'tenantsController'
      })
      .when('/spaces', {
        templateUrl: 'views/pages/spaces.html',
        controller: 'spacesController'
      })
      .when('/projections', {
        templateUrl: 'views/pages/projections.html',
        controller: 'projectionsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
