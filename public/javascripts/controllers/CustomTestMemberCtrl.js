CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage, $location) {

    //---> Authentication redirect
    $scope.user = null;
    $scope.codePagination = [1, 2, 3, 4, 5];
    $scope.paginnationAC = 1;
    $scope.listSourceCode = [];
    init();
    
    function init() {
        console.log($localStorage.currentUser)
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
                    console.log($scope.user)
                    delete $scope.user.Password;

                    //getListSourceCode();
                },
                function (error) {
                    $scope.user = null;
                }
            )
        }
    }

    function getListSourceCode(){
        $http({
            method: 'get',
            url: '/api/usercode',
            data: {
                limit: 10,
                startKey: null
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
    
    function saveCode(fileName) {
        console.log(fileName);
        console.log($scope.user);
        $('#modal-saveCode').modal('hide');
        $scope.fileName = '';


        let code = new SourceCode(null, fileName, $scope.iCode, 'C/C++');
        console.log(code);
        $http({
            method: 'post',
            url: '/api/savecode',
            data: code,
            headers: {
                Authorization: $localStorage.currentUser.token
            }
        }).then(
            function (response) {
                let result = response.data;
                if (result.error || (result.error == null && result.data == null)){
                    swal({
                        title: "Thất bại!",
                        text: "Lưu code thất  bại, vui lòng kiểm tra lại các thông tin!",
                        type: "error"
                    });
                }else if (result.data){
                    swal({
                        title: "Thành công!",
                        text: "Lưu code thành công",
                        type: "success"
                    });
                }
            },
            function (error) {
                swal({
                    title: "Thất bại!",
                    text: "Lưu code thất  bại, vui lòng kiểm tra lại các thông tin!",
                    type: "error"
                });
            }
        )
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
    
    function SourceCode(UserName, FileName, Content, Language) {
        this.UserName = UserName;
        this.FileName = FileName;
        this.Language = Language;
        this.Content = Content;
        this.DateCreated = Date.now().toString();
        this.LastUpdated = Date.now().toString();
    }
});