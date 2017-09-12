CodeOnlineApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'teamplate/customtest.html'
        })
        .when('/customtest', {
            templateUrl: 'teamplate/customtest.html'
        })
        .when('/contests', {
            templateUrl: 'teamplate/contests.html'
        })
        .when('/gym', {
            templateUrl: 'teamplate/gym.html'
        })
        .when('/problemset', {
            templateUrl: 'teamplate/problemset.html'
        })
        .when('/account', {
            templateUrl: 'teamplate/account.html'
        })
});