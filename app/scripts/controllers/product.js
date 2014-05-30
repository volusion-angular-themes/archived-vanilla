'use strict';

angular.module('volusion.controllers').controller('ProductCtrl', [
  '$scope',
  'product',
  function($scope, product) {
    $scope.product = product.data;
  }
]);
