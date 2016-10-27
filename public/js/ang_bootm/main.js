'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
  'ngRoute',
  'ngSanitize',
  'mainApp.blog',
  'mainApp.post',
  'mainApp.map',
  'mainApp.gallery',
  'mainApp.contact',
  'postServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/map'});
}])
.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
  var tabs = [
    { title: 'Mapsss', path: 'map', idx: 0},
    { title: 'Blog', path: 'blog', idx: 1},
    { title: 'Gallery', path: 'gallery', idx: 2}  ,
    { title: 'Contact', path: 'contact', idx: 3}
  ];

  $scope.tabs = tabs;

  $scope.curr_title = tabs[0].title;

  $scope.go = function ( tab, path ) {
    $scope.curr_title = tab.title;
    $location.path(path);
  };
}]);