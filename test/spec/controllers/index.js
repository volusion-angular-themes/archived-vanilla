'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: IndexCtrl', function() {

  beforeEach(module('volusion.controllers'));

  var api;
  var controller;
  var scope;
  var rootScope;
  var tokenGenerator;

  var cacheBustingToken = { 'foo': 'bar' };

  var response = {
    data: {
      seo: {
        foo: 'bar',
        baz: 'qux'
      },
      checkout: {
        cartId: '1234'
      }
    }
  };

  /*jshint camelcase: false */
  beforeEach(inject(function($controller, $rootScope, _api_, _tokenGenerator_) {
    api = _api_;
    rootScope = $rootScope;
    scope = $rootScope.$new();

    tokenGenerator = _tokenGenerator_;

    sinon.stub(tokenGenerator, 'getCacheBustingToken', function() {
      return cacheBustingToken;
    });

    sinon.stub(api.config, 'get', function() {
      return {
        then: function(fn) {
          return fn(response);
        }
      };
    });

    controller = $controller('IndexCtrl', {
      $scope: scope
    });

  }));

  afterEach(function() {
    api.config.get.restore();
    tokenGenerator.getCacheBustingToken.restore();
  });

  /*jshint camelcase: true */

  it('should navigate home when no sub-route is defined', function() {
    inject(function($state) {
      var go = sinon.stub($state, 'go');
      rootScope.$broadcast('$stateChangeSuccess', { name: 'i18n' });
      expect(go).to.have.been.calledOnce;
      expect(go).to.have.been.calledWithExactly('.home', null, { location: 'replace' });
      $state.go.restore();
    });
  });

  it('sends the cachebusting token to the config api call', function () {
    expect(api.config.get).to.have.been.calledWithExactly(cacheBustingToken);
  });

});
