/**
 * @ngdoc directive
 * @name schoolroutes.directive:blockRecentWork
 * @description
 * # blockRecentWork
 */
angular.module('schoolroutes')
  .directive('blockRecentWork', function () {
    return {
      templateUrl: 'views/directives/blockrecentwork.html',
      restrict: 'A',
			scope: {
				block: '=block'
			},
      link: function postLink(scope, element, attrs) {
				
			}
    };
  });
