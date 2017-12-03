CodeOnlineApp.controller('AuthenticationCtrl', function ($scope, $http, AuthenticationService) {
    $scope.newUser = new User('', '', '', '');
    $scope.member = new Member('', '');

    $scope.login = login;
    $scope.register = register;

    function login() {
        $http({
            method: 'post',
            url: '/api/login',
            data: $scope.member
        }).then(
            function (response) {
                alert('Thanh công');
                console.log(response)
            },
            function (error) {
                alert('Thất bại');
                console.log(error);
            }
        );
    }

    function register() {
        $http({
            method: 'post',
            url: '/api/register',
            data: $scope.newUser
        }).then(
            function (response) {
                alert('Thanh công');
                console.log(response)
            },
            function (error) {
                alert('Thất bại');
                console.log(error);
            }
        );
    }



    function User(userName, email, password, rePassword) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.rePassword =rePassword;
    }

    function Member(userName, password) {
        this.userName = userName;
        this.password = password;
    }
});