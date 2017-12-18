CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage, $location) {

    let user = $localStorage.currentUser;
    console.log(user);
    
    init();
    
    function init() {
        if (!user){
            window.location = '/guest';
        }else{
            $http({
                method: 'get',
                url: '/api/info',
                headers: {
                    Authorization: user.token
                }
            }).then(
                function (response) {
                    console.log(response)
                },
                function (error) {
                    console.log(error)
                }
            )

        }
    }
});