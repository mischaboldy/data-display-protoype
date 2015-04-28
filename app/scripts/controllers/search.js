'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('SearchController', function ($scope) {

    $scope.outputHide = true;
    $scope.searchModel = [];

    $scope.randomNr = function () {
      return Math.floor(Math.random()*100);
    }

    $scope.findTerm = function () {
      var splitTerms = $scope.term.split(" ")
      var terms = [];
      var a;
      var i;
      $scope.searchModel.length = 0;
      $scope.outputHide = false;
      $scope.searchTerm = $scope.term;
      // needs to be redone to only search for the total search term)

      for (a = 0; a < splitTerms.length ; a++) {
        if (splitTerms[a] != "") {terms.push(splitTerms[a])}
      }

      if (terms.length != 1) {
        terms.push($scope.term)
      }

      for ( i = 0; i < terms.length; i++) {
        $scope.searchModel.push({
          term : terms[i],
          count: $scope.randomNr(),
          quizesCount : $scope.randomNr(),
          spacesCount : $scope.randomNr(),
          chapterCount: $scope.randomNr()
        })
      }
    }
  });
