CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage, $location) {

    //---> Authentication redirect
    $scope.user = null;
    $scope.codePagination = [1, 2, 3, 4, 5];
    $scope.paginnationAC = 1;
    $scope.listSourceCode = [];
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
                    codePaginationChange(1);
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
    $scope.sourceCodeSelected = null;
    $scope.codeCompiling = codeCompiling;
    $scope.saveCode = saveCode;
    $scope.saveCodeBtnClick = saveCodeBtnClick;
    $scope.codePaginationChange = codePaginationChange;
    $scope.sourceCodeSelectedChange = sourceCodeSelectedChange;
    $scope.refreshCode = refreshCode;

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
                    $scope.iCodeOutput = response.data
                },
                function (error) {
                    console.log(error)
                    $scope.iCodeOutput = 'Error'
                }
            )
        }
    }
    
    function saveCode(fileName) {
        if ($scope.sourceCodeSelected === null){
            //Create
            $('#modal-saveCode').modal('hide');
            $scope.fileName = '';
            let code = new SourceCode(null, fileName, $scope.iCode, 'C/C++');

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
                        codePaginationChange($scope.paginnationAC)
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
    }

    function saveCodeBtnClick() {
        if ($scope.sourceCodeSelected === null){
            //Create
            $('#modal-saveCode').modal('show');
        }else{
            //Update
            $http({
                method: 'put',
                url: '/api/savecode',
                data: {
                    code: $scope.iCode,
                    fileName: $scope.sourceCodeSelected.FileName.S
                },
                headers: {
                    Authorization: $localStorage.currentUser.token
                }
            }).then(
                function (response) {
                    let result = response.data;
                    if (result.error || (result.error === null && result.data === null)){
                        swal({
                            title: "Thất bại!",
                            text: "Cập nhật code thất  bại, vui lòng kiểm tra lại các thông tin!",
                            type: "error"
                        });
                    }else if (result.data){
                        codePaginationChange($scope.paginnationAC);
                        swal({
                            title: "Thành công!",
                            text: "Cập nhật code thành công",
                            type: "success"
                        });
                    }
                },
                function (error) {
                    swal({
                        title: "Thất bại!",
                        text: "Cập nhật code thất  bại, vui lòng kiểm tra lại các thông tin!",
                        type: "error"
                    });
                }
            )
        }
    }

    function codePaginationChange(pa) {
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
        let startKeyFileName = -1;

        if (pa !== 1){
            let tmp = $scope.listSourceCode[$scope.listSourceCode.length-1];
            console.log(tmp);
            startKeyFileName = tmp.FileName.S;
        }

        $http({
            method: 'get',
            url: '/api/usercode/' + '10/' + startKeyFileName,
            headers: {
                Authorization: $localStorage.currentUser.token
            }
        }).then(
            function (response) {
                console.log(response);
                let data = response.data;
                if(!data.error){
                    $scope.listSourceCode = data.data.Items;
                }else{
                    $scope.listSourceCode = [];
                }

                //Ngay gio
                let codes = $scope.listSourceCode;
                for (let i=0; i<codes.length; i++){
                    codes[i]['DateCreated']['Plan'] = new Date(parseInt(codes[i]['DateCreated']['S']));
                    codes[i]['LastUpdated']['Plan'] = new Date(parseInt(codes[i]['LastUpdated']['S']));

                    if (typeof codes[i].Content.S === 'string'){
                        let tmp = JSON.parse(codes[i].Content.S);
                        codes[i].Content['M'] = {
                            inputs: {
                                S: tmp.inputs
                            },
                            sourceCode: {
                                S: tmp.sourceCode
                            }
                        }
                    }
                }
            },
            function (error) {
                $scope.listSourceCode = [];
            }
        )
    }

    function sourceCodeSelectedChange(code) {
        console.log(code)
        $scope.sourceCodeSelected = code;
        $scope.iCode.sourceCode = code.Content.M.sourceCode.S;
        $scope.iCode.inputs = code.Content.M.inputs.S;
        $scope.iCodeOutput = '';
    }

    function refreshCode() {
        $scope.sourceCodeSelected = null;
        $scope.iCode.sourceCode = '';
        $scope.iCode.inputs = '';
        $scope.iCodeOutput = '';
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