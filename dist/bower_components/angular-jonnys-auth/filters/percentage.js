'use strict';

/**
 * @ngdoc filter
 * @name clientApp.filter:percentage
 * @function
 * @description
 * # percentage
 * Filter in the clientApp.
 */
angular.module('jonnysAuthModule')
  .filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
    	return $filter('number')(input * 100, decimals) + '%';
  };
  }]);
