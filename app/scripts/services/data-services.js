'use strict';
angular.module('DataDisplayPrototypeApp')
  .directive("leftsidebar", function () {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/leftSidebar.html'
     }

  }).directive("rightsidebar", function () {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/rightSidebar.html'
     }

  });



