'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
angular.module('jonnysAuthModule')
  .controller('jonnysAuthModule.ProfileCtrl', function ($scope,$http, $window, $routeParams, userService) {
    var token = $window.localStorage.getItem('token');

    if ($routeParams.id) {
      userService.login($routeParams.id);
      token = $routeParams.id;
    }

    console.log(token);

    var request = $http.get('/profile');
    request.success(function(data) {
      //console.log(data);
      $scope.user = data;
      console.log(data);
    });

    request.error(function(data) {
      console.log(data);
    });

    $scope.logout = function () {
      userService.logout();
      $window.location.href = '#/';
  };

  });
