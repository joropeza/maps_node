'use strict';

/**
 * @ngdoc service
 * @name clientApp.user
 * @description
 * # user
 * Factory in the clientApp.
 */
angular.module('jonnysAuthModule')
  .factory('userService', function ($window,$rootScope,$http) {
    return {
        
        token: function() {
            var token;
            if ($window.localStorage.getItem('token')) {
                token = $window.localStorage.getItem('token');
            }
            return token;
        },
        logout: function() {
          $rootScope.$broadcast('user:logout',false);
          $window.localStorage.removeItem('token');
        },
        login: function(token) {
          $rootScope.$broadcast('user:login',token);
          $window.localStorage.setItem('token', token);
        },
        profile: function() {
          return $http.get('/profile')
            .success(function(data) {
              return data;
            });
        }
    };
  });
