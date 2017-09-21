CodeOnlineApp.controller('AuthenticationCtrl', function ($scope) {
    $scope.user = new User('', '', '', '');

    function User(useName, email, password, rePassword) {
        this.userName = useName;
        this.email = email;
        this.password = password;
        this.rePassword =rePassword;
    }
});