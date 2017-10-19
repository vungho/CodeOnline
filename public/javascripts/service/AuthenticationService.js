CodeOnlineApp.factory('AuthenticationService', function ($http, $q) {
    function AuthenticationService() {
        let self = this;

        self.postLoginInfo = function (username, passwork) {
            let deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/table'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
    }
    return new AuthenticationService();
});