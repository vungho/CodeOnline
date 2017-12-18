CodeOnlineApp.controller('LogoutCtrl', function ($scope, $http, $localStorage) {

    $scope.logout = logout;

    function logout() {
        delete $localStorage.currentUser;
        window.location = '/guest';
    }
});