CodeOnlineApp.controller('CreateTableCtrl', function (TableService, ColumnService, DataService, FileUploader, $scope ) {
    $scope.listTable = [];
    $scope.tableSelected = '';
    $scope.newTable = {
        tableName: undefined,
        partitionKey: undefined,
        sortKey: undefined
    };
    $scope.sortKeySupport = false;
    $scope.newTableCheck = {
        tableName : '',
        partitionKey : '',
        sortKey : ''
    };
    $scope.tableMessage = {
        icon: '',
        message: ''
    };
    $scope.fileMeta = '';

    init();

    $scope.openModalCreateTable = function () {
        refreshFiledData();
    };

    $scope.tableItemChanged = function () {
        console.log($scope.tableSelected)
    };

    $scope.checkFiled = function (key) {
        checkFiled(key)
    };

    $scope.createTable = function () {
        if (checkSumFiled()){
            console.log('NOT Fail');
            createNewTable();
        }else{
            console.log('Fail');
        }
        console.log($scope.newTable);
    };

    $scope.deleteTable = function () {
        $('#loading-div').show();
        TableService.deleteTable($scope.tableSelected).then(
            function (res) {
               if (res.data.result.TableDescription != null){
                   $scope.tableMessage.icon = 'ui-1_check';
                   $scope.tableMessage.message = 'Delete table successfully!';
                   init();
               }else{
                   $scope.tableMessage.icon = 'media-2_sound-wave';
                   $scope.tableMessage.message = 'Delete table unsuccessfully! '
               }
            }
        ).then(function () {
            $('#message-modal').modal('show');
            $('#loading-div').hide();
        })
    };

    $scope.importJsonFile = function () {

    };

    $scope.openSelectFileWindow = function () {
        document.getElementById('choose-file-btn').click();
    };
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.uploader = new FileUploader();
    $scope.uploader.url = '/api/table/file';
    $scope.uploader.filters.push({
        name: 'asyncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
            setTimeout(deferred.resolve, 1e3);
        }
    });


    $scope.uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
        console.log( $scope.uploader)
        fileNameChanged();
    };

    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };

    function fileNameChanged () {
        let len = $scope.uploader.queue.length;
        $scope.uploader.queue[len-1].upload();
    };

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------



    function init() {
        TableService.getAllTable().then(
            function (res) {
                mappingListTable(0, res);
            }
        )
    }

    function mappingListTable(index, res) {
        if (index >= 0){
            $scope.listTable = res.data.result.TableNames;
            $scope.tableSelected = $scope.listTable[index];
        }else{
            $scope.listTable = res.data.result;
        }
    }

    function checkFiled(key) {
        if ($scope.newTable[key] == undefined){
            setStyleFiled(key, 'has-danger');
            return false;
        }else{
            console.log(key)
            if (key  == 'tableName'){
                for (let i=0; i<$scope.listTable.length; i++){
                    if ($scope.newTable[key] == $scope.listTable[i]){
                        alert('Ten bang bi trung!');
                        setStyleFiled(key, 'has-danger');
                        return false;
                    }
                }
            }
            setStyleFiled(key, 'has-success');
            return true;
        }


    }

    function setStyleFiled(key, style) {
        $scope.newTableCheck[key] = style;
    }

    function checkSumFiled() {
        let isNotFail = true;
        if ($scope.sortKeySupport){
            isNotFail = isNotFail && checkFiled('tableName');
            isNotFail = isNotFail && checkFiled('partitionKey');
            isNotFail = isNotFail && checkFiled('sortKey');
        }else{
            isNotFail = isNotFail && checkFiled('tableName');
            isNotFail = isNotFail && checkFiled('partitionKey');
        }

        return isNotFail;
    }

    function refreshFiledData() {
        $scope.newTable = {
            tableName: undefined,
            partitionKey: undefined,
            sortKey: undefined
        };
        $scope.sortKeySupport = false;
        $scope.newTableCheck = {
            tableName : '',
            partitionKey : '',
            sortKey : ''
        };
    }
    
    function createNewTable() {
        $('#create-table-modal').modal('hide');
        $('#loading-div').show();
        TableService.postNewTable($scope.newTable.tableName, $scope.newTable.partitionKey, $scope.newTable.sortKey).then(
            function (res) {
                console.log(res);
                if (res.data.result != null){
                    $scope.tableMessage.icon = 'ui-1_check';
                    $scope.tableMessage.message = 'Create table successfully!';
                    init();
                }else{
                    $scope.tableMessage.icon = 'media-2_sound-wave';
                    $scope.tableMessage.message = 'Create table unsuccessfully! '
                }
            }
        ).then(function () {
            $('#loading-div').hide();
            $('#message-modal').modal('show');
        })
    }

});