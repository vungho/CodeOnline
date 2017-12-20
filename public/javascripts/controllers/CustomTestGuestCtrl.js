CodeOnlineApp.controller('CustomTestCtrl', function ($scope, $http, $localStorage) {

    function init() {
        if ($localStorage.currentUser){
            window.location = '/member';
        }
    }

    $scope.iCode = new Code('', '');
    $scope.iCodeOutput = '';
    $scope.listLanguage = [
        {
            signname: 'cpp',
            name: 'C++'
        },
        {
            signname: 'java',
            name: 'Java'
        },
        {
            signname: 'c',
            name: 'C'
        },
        {
            signname: 'php',
            name: 'PHP'
        },
        {
            signname: 'perl',
            name: 'Perl'
        },
        {
            signname: 'ruby',
            name: 'Ruby'
        },
        {
            signname: 'go',
            name: 'GO Lang'
        },
        {
            signname: 'csharp',
            name: 'C#'
        },
        {
            signname: 'swift',
            name: 'Swift'
        },
        {
            signname: 'nodejs',
            name: 'NodeJS'
        },
        {
            signname: 'kotlin',
            name: 'Kotlin'
        }
    ];
    $scope.complierLanguage = 'cpp';
    $scope.codeCompiling = codeCompiling;
    function codeCompiling() {
        let iCode = Object.assign({}, $scope.iCode);
        iCode['complierLanguage'] = $scope.complierLanguage;
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