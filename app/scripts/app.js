'use strict';

/**
 * @ngdoc overview
 * @name schoolroutes
 * @description
 * # schoolroutes
 *
 * Main module of the application.
 */
angular
  .module('schoolroutes', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngCkeditor'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/routes', {
        templateUrl: 'views/routes.html',
        controller: 'RoutesCtrl'
      })
    .when('/school/:schoolid/route/new', {
        templateUrl: 'views/route.html',
        controller: 'RouteCtrl'
      })
    .when('/school/:schoolid/route/:routeid', {
        templateUrl: 'views/route.html',
        controller: 'RouteCtrl'
      })
      .when('/homepage', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/schools', {
        templateUrl: 'views/schools.html',
        controller: 'SchoolsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
