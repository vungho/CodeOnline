CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage) {

    $scope.iCode = new Code('', '');
    $scope.iCodeOutput = '';
    $scope.codeCompiling = codeCompiling;
    function codeCompiling() {``
        let iCode = Object.assign({}, $scope.iCode);

        //Convert code
        console.log(iCode);
        iCode.inputs = iCode.inputs.replace(/\n/g, ' ').split(' ');
        console.log(iCode)
        if (iCode.sourceCode && iCode.inputs){
            $http({
                method: 'post',
                url: '/api/codecompiling',
                data: JSON.stringify(iCode)
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


    function Code(source, input) {
        this.sourceCode = source;
        this.inputs = input
    }
});