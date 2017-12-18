CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage) {

    $scope.iCode = new Code('', '');
    $scope.iCodeOutput = '';
    $scope.codeCompiling = codeCompiling;
    function codeCompiling() {
        let iCode = Object.assign({}, $scope.iCode);
        if (iCode.sourceCode){
            $http({
                method: 'post',
                url: '/api/codecompiling',
                data: JSON.stringify(iCode)
            }).then(
                function (response) {
                    $scope.iCodeOutput = response.data
                },
                function (error) {
                    $scope.iCodeOutput = 'Error'
                }
            )
        }
    }


    function Code(source, input) {
        this.sourceCode = source;
        this.inputs = input
    }
});