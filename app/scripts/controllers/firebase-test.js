'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('firebaseCtrl', function ($scope, $firebaseObject) {

    var ref = new Firebase("https://data-display.firebaseio.com");

    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "data");

    $scope.createData = function() {
      var usersRef = ref.child("users");
      usersRef.set({
        alanisawesome: {
          date_of_birth: "June 23, 1912",
          full_name: "Alan Turing"
        },
        gracehop: {
          date_of_birth: "December 9, 1906",
          full_name: "Grace Hopper"
        }
      });
    }
  });


//create data for
// 5 users
// 5 spaces
// completions etc
// followed paths
