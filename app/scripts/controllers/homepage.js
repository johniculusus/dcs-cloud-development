'use strict';

/**
 * @ngdoc function
 * @name schoolroutes.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the schoolroutes
 */
angular.module('schoolroutes').controller('HomepageCtrl', function ($scope, $http) {
	$scope.editorOptions = {
		height: '200px'
	};

	$http.get("/api/homepage").success(function(data, status) {
		$scope.homepage = data;
		// Sync $scope.homepage.Clients -> $scope._clients
		$scope._clients = [];
		angular.forEach($scope.homepage.Clients, function(client) {
			$scope._clients.push({ Media: client });
		});
	}).error(function(data, status) {
		alert("Oops: Unable to load current homepage!\n(#" + status + ": " + data + ")");
	});

	$scope.save = function() {
		// Sync $scope._clients -> $scope.homepage.Clients
		$scope.homepage.Clients = [];
		angular.forEach($scope._clients, function(client) {
			$scope.homepage.Clients.push(client.Media);
		});
		$http.post("/api/homepage", $scope.homepage).success(function(data, status) {
			alert("Home page updated!");
		}).error(function(data, status) {
			alert("Oops: Unable to save new homepage!\n(#" + status + ": " + data + ")");
		});
	};

	$scope.addClient = function() {
		$scope._clients = $scope._clients || [];
		$scope._clients.push({Media: ''});
	};
	$scope.removeClient = function(index) {
		$scope._clients = $scope._clients || [];
		$scope._clients.splice(index, 1);
	};

	$scope.addSlide = function() {
		$scope.homepage.SlideShow = $scope.homepage.SlideShow || [];
		$scope.homepage.SlideShow.push({
			Title: '',
			Media: '',
			Href: '',
			Text: '',
		});
	};
	$scope.removeSlide = function(index) {
		$scope.homepage.SlideShow = $scope.homepage.SlideShow || [];
		$scope.homepage.SlideShow.splice(index, 1);
	};
});
