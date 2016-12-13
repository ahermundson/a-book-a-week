var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'angularMoment', 'firebase', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hm'
        })
        .when('/book-shelf', {
            templateUrl: '/views/templates/book-shelf.html',
            controller: 'BookShelfController',
            controllerAs: 'bs'
        })
        .when('/night-stand', {
            templateUrl: '/views/templates/night-stand.html',
            controller: 'NightStandController',
            controllerAs: 'ns'
        })
        .when('/recommend', {
            templateUrl: '/views/templates/recommend.html',
            controller: 'RecommendBookController',
            controllerAs: 'rb'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
