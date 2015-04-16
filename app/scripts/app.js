'use strict';
angular.module('DataDisplayPrototypeApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pages/main.html',
        controller: 'MainCtrl'
      })
      .when('/notsureyet', {
        templateUrl: 'views/pages/notsureyet.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
