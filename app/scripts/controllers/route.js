'use strict';

/**
 * @ngdoc function
 * @name schoolroutes.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the schoolroutes
 */
angular.module('schoolroutes')
.controller('RouteCtrl', function ($scope, $routeParams, $http, $window) {
    $scope.id = $routeParams.routeid;
    $scope.route = {};
    $scope.message = {};

    if ($scope.id) {
        $http.get("/api/route/" + $scope.id).success(function(data, status) {
            $scope.route = data;
        }).error(function(data, status) {
            showMessage("danger", data);
        });
    }

    $scope.save = function() {
        var config = {
            data: $scope.route
        }
        if ($scope.route.ID) {
            config.method = "PUT";
            config.url = "/api/route/" + $scope.route.ID;
        } else {
            config.method = "POST";
            config.url = "/api/route";
        }
        if (config.data.Type === "") {
            config.data.Type = undefined;
        } else {
            config.data.Type = parseInt(config.data.Type);
        }
        if (!config.data.SchoolID) {
            config.data.SchoolID = parseInt($routeParams.schoolid);
        }
        $http(config).success(function(data, status) {
           showMessage("success", "Saved with success");
           if(!$scope.id) {
               $window.location.replace("#/school/" + $routeParams.schoolid + "/route/" + data);
           }
        }).error(function(data, status) {
           showMessage("danger", data);
        });
    };

    var showMessage = function(type, text) {
        $scope.message.Type = type;
        $scope.message.Text = text;
        $scope.message.Show = true;
    }
});
