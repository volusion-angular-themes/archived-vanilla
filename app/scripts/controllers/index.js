'use strict';

angular.module('volusion.controllers').controller('IndexCtrl', [
  '$scope',
  '$state',
  'api',
  '$rootScope',
  'tokenGenerator',
  function(
    $scope,
    $state,
    api,
    $rootScope,
    tokenGenerator) {

    $rootScope.seo = {};

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      }
    });

    $scope.global = {
      cart: {
        itemCount: 10
      }
    };

    this.getConfig = function (callbackFn) {
      // Config
      api.config.get(tokenGenerator.getCacheBustingToken()).then(function (response) {
        $scope.config = response.data;
        angular.extend($rootScope.seo, $scope.config.seo);

        // TODO: REMOVE
        console.log('Config: ', response.data);

        if (callbackFn) {
          callbackFn($scope.config.checkout.cartId);
        }

      }, function (error) {

        console.log('Error: ', error);

      });
    };

    this.getCart = function (cartId) {
      // Carts
      api.carts.get({ cartId: cartId })
        .then(function (response) {
          $scope.cart = response.data;
          // TODO: REMOVE
          console.log('Cart: ', response.data);
        }, function (error) {
          console.log('Error: ', error);
        });
    };

    this.getConfig(this.getCart);

  }
]);
