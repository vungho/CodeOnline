CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage) {

    function init() {
        if ($localStorage.currentUser){
            window.location = '/member';
        }
    }

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
                    console.log(response)
                    $scope.iCodeOutput = response.data.output;
                },
                function (error) {
                    console.log(error)
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