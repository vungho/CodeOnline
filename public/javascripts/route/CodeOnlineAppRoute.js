CodeOnlineApp.directive('authentication', function () {
    return {
        restrict: 'E',
        templateUrl: 'teamplate/authentication.html'
    }
});

CodeOnlineApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'teamplate/customtest_guest.html'
        })
        .when('/customtest', {
            templateUrl: 'teamplate/customtest_guest.html'
        })
        .when('/account', {
            templateUrl: 'teamplate/account.html'
        })
});