var app = angular.module('app', [
  'ngAnimate',
  'ngRoute',
  'appControllers'
]);
 
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);