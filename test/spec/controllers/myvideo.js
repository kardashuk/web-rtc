'use strict';

describe('Controller: MyvideoCtrl', function () {

  // load the controller's module
  beforeEach(module('webRtcApp'));

  var MyvideoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyvideoCtrl = $controller('MyvideoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
