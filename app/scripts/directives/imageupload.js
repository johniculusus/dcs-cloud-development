// 'use strict';

/**
 * @ngdoc directive
 * @name schoolroutes.directive:imageUpload
 * @description
 * # imageUpload
 */
angular.module('schoolroutes')
	.directive('imageUpload', ['$http', '$window', '$log', function ($http, $window, $log) {
		return {
			templateUrl: 'views/directives/imageupload.html',
			restrict: 'E',
			scope: {
				target: '=target',
				width: '=width',
				height: '=height',
				inputbox: '=inputbox'
			},
			link: function postLink(scope, element, attrs) {
				scope.width = scope.width || '300';
				scope.height = scope.height || '300';
				
				var $form = $(element[0].getElementsByTagName('form')[0]);
				
				scope.placeholder = function(t, c) {
					var url = 'http://placehold.it/' + scope.width + 'x' + scope.height;
					if (c) {
						url += '/' + c;
					}
					if (t) {
						url += '&text=' + t;
					}
					return url;
				};
				
				// remove(): resets the target value.
				scope.remove = function() {
					scope.target = '';
				};
				
				// imageUrl(): calculates the URL for the image displayed.
				scope.imageUrl = function() {
					if (!scope.target) {
						return scope.placeholder();
					} else if (/.*www\.youtube\.com\/embed.*/.test(scope.target)) {
						var aux = /http:\/\/www\.youtube.com\/embed\/([a-zA-Z0-9_-]*)/.exec(scope.target);
						if (aux) {
							return 'http://img.youtube.com/vi/' + aux[1] + '/mqdefault.jpg';
						} else {
							return scope.placeholder('Youbute Video', 'c3181e/ffffff');
						}
					} else if (/.*player\.vimeo\.com.*/.test(scope.target)) {
						return scope.placeholder('Vimeo Video', '17b3e8/ffffff');
					} else {
						return scope.target
					}
				}
				
				// upload($event): uploads the selected image.
				scope.upload = function($event) {
					// var $form = $($event.target.parentNode.parentNode.parentNode);
					scope.loading=true;
					scope.error='';
					
					// First, get upload session ...
					$http.get('/blobs/session/').success(function(uploadUrl) {
						$form.ajaxSubmit({
							url: uploadUrl,
							type: 'post',
							success : function(data) {
								if (data) {
									var imgUrl = '//' + $window.location.host + '/blobs/serve/' + data;
									scope.target = imgUrl;
								}
								scope.loading=false;
								scope.$apply();
							},
							error : function(xhr, st, error) {
								scope.error = "Upload error (" + st + '; error=' + error + ")";
								scope.loading=false;
								scope.$apply();
							}
						});
					}).error(function(data, st, header, config) {
						scope.error = st + '; error=' + data;
						scope.loading=false;
					})
				};
			}
		};
	}]);
