CodeOnlineApp.factory('ColumnService', function ($http, $q) {
    function ColumnService() {
        let self = this;

        self.getAllColumnTable = function () {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/table'
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };
    }
    return new ColumnService();
});