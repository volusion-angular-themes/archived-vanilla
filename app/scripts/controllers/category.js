'use strict';

angular.module('volusion.controllers').controller('CategoryCtrl', [
  '$scope',
  'category',
  function ($scope, category) {
    $scope.category = category.data;
  }
]);
