'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the clientApp
 */
angular.module('jonnysAuthModule')
  .controller('jonnysAuthModule.UserCtrl', function ($scope, $rootScope, $http, $window, userService) {
    $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.login = function (credentials) {
    console.log(credentials);
    var request = $http.post('/login', credentials);

    request.success(function (data) {
      console.log(data);
      if (data.success) {
      userService.login(data.user._id);
      $window.location.href = '#/profile';
    } else {
      $scope.msg = data.message;
      $scope.loginError = true;
    }
    });
  };

  
  $scope.signup = function (credentials) {
    
          var post = $http.post('/signup', credentials);
          post.success(function(data) {
            console.log(data);
            $window.location.href = '#/profile';
          });
  };

  });
