'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name clientApp.controller:HeaderctrlCtrl
 * @description
 * # HeaderctrlCtrl
 * Controller of the clientApp
 */
angular.module('jonnysAuthModule')
    .controller('jonnysAuthModule.HeaderCtrl', function($scope, userService) {

        $scope.loggedIn = function(data) {

            $scope.user = data;

            if (data.local) {
                $scope.userName = data.local.email;
                $scope.userSource = 'Local';
            }

            if (data.facebook) {
                $scope.userName = data.facebook.email;
                $scope.userSource = 'Facebook';
            }

            if (data.twitter) {
                $scope.userName = data.twitter.username;
                $scope.userSource = 'Twitter';
            }

        };

        $scope.isUser = false;

        if (userService.token()) {
            userService.profile().success(function(data) {
                $scope.isUser = true;
                $scope.loggedIn(data);

            });
        }

        $scope.$on('user:logout', function(event, data) {
            $scope.isUser = false;
            $scope.userName = null;
        });

        $scope.$on('user:login', function(event, data) {
            $scope.isUser = true;
            userService.profile().success(function(data) {
                $scope.loggedIn(data);
            });

        });

    });