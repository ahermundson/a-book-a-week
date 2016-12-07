var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
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
        .when('/addBookModal', {
            templateUrl: '/views/templates/addBookModal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'mi'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
