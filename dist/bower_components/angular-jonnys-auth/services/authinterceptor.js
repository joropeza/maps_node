'use strict';

/**
 * @ngdoc service
 * @name clientApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Service in the clientApp.
 */
angular.module('jonnysAuthModule')
  .factory('AuthInterceptor', function ($window, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.localStorage.getItem('token')) {
                config.headers.Authorization = $window.localStorage.getItem('token');
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
                // TODO: Redirect user to login page.
            }
            return response || $q.when(response);
        }
    };
});
