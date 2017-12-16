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

                console.log(response)
                swal({
                    title: "Thành công!",
                    text: "Tạo tài khoản thành công, vui lòng đăng nhập để sự dụng các tính năng!",
                    type: "success"
                });

            },
            function (error) {
                swal({
                    title: "Thất bại!",
                    text: "Tạo tài khoản thất  bại, vui lòng kiểm tra lại các thông tin!",
                    type: "error"
                });
                console.log(error);
            }
        );
    }



    function User(userName, email, password, rePassword) {
        this.UserName = userName;
        this.Email = email;
        this.Password = password;
        this.RePassword =rePassword;
        this.OpenIdType = 'None'
    }

    function Member(userName, password) {
        this.UserName = userName;
        this.Password = password;
        this.OpenIdType = 'None'
    }
});