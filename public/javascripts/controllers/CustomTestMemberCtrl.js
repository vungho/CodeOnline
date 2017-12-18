CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage, $location) {

    //---> Authentication redirect
    $scope.user = null;
    $scope.codePagination = [1, 2, 3, 4, 5];
    $scope.paginnationAC = 1;
    init();
    
    function init() {
        if (!$localStorage.currentUser){
            window.location = '/guest';
        }else{
            $http({
                method: 'get',
                url: '/api/info',
                headers: {
                    Authorization: $localStorage.currentUser.token
                }
            }).then(
                function (response) {
                    $scope.user = response.data;
                    delete $scope.user.Password;
                },
                function (error) {
                    $scope.user = null;
                }
            )
        }
    }

    // ----> Authentication redirect

    // -- > Feature code
    $scope.iCode = new Code('', '');
    $scope.iCodeOutput = '';
    $scope.codeCompiling = codeCompiling;
    $scope.saveCode = saveCode;
    $scope.codePaginationChange = codePaginationChange;
    
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
    
    function saveCode() {
        
    }
    
    function codePaginationChange(pa, instance) {
        let index = $scope.codePagination.indexOf(pa);
        if (index === 4){
            for (let i=0; i<$scope.codePagination.length; i++){
                $scope.codePagination[i] += 3;
            }
        }else if (index === 0 && pa !== 1){
            for (let i=0; i<$scope.codePagination.length; i++){
                $scope.codePagination[i] -= 3;
            }
        }
        $scope.paginnationAC = pa;
        //Load code with pa
        $http({
            method: 'get',
            url: '/api/usercode/' +$scope.user + '/10/' + ((pa-1)*10)
        }).then(
            function (response) {
                console.log(response)
            },
            function (error) {
                console.log(error)
            }
        )
    }

    function Code(source, input) {
        this.sourceCode = source;
        this.inputs = input
    }
});