'use strict';

module.exports = ['$scope',
  function($scope) {
    console.log('home');
    $scope.totalItems = 64;
    $scope.currentPage = 4;
  }
]
