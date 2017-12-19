var AWS = require("aws-sdk");
var DBConfig = require("./DBConfig");

/**
 * Create new Source file
 * @param userName : username
 * @param fileName : file name
 * @param content : file content
 * @param language : source code language
 * @param callBack
 */
exports.createNewSourceFile = function (userName, fileName, content, language, callBack) {
    AWS.config.update(DBConfig.AwsConfig);
    var sourceCode = {
        "UserName" : userName,
        "FileName" : fileName,
        "Language" : language,
        "Content" : content,
        "DateCreated" : Date.now().toString(),
        "LastUpdated" : Date.now().toString()
    };
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: DBConfig.Tables.SourceCode.Name,
        Item: sourceCode
    };
    docClient.put(params, function(error, data){
        callBack(error, data);
    });
};

/**
 * update existed source
 * @param userName
 * @param fileName
 * @param sourceCodeContent
 * @param callBack
 */
exports.updateSourceFile = function (userName, fileName, sourceCodeContent, callBack) {
    AWS.config.update(DBConfig.AwsConfig);
    var dynamoDB = new AWS.DynamoDB();
    var params = {
        ExpressionAttributeNames :{
            "#C" : [DBConfig.Tables.SourceCode.KeySchema.Columns.Content.ColumnName].toString()
        },
        ExpressionAttributeValues :{
            ":newC" : {
                [DBConfig.Tables.SourceCode.KeySchema.Columns.Content.Type] : sourceCodeContent
            }
        },
        Key :{
          [DBConfig.Tables.SourceCode.KeySchema.PartitionKey.ColumnName] : {
              [DBConfig.Tables.SourceCode.KeySchema.Columns.UserName.Type] : userName
          },
          [DBConfig.Tables.SourceCode.KeySchema.SortKey.ColumnName] : {
              [DBConfig.Tables.SourceCode.KeySchema.Columns.FileName.Type] : fileName
          }
        },
        TableName: DBConfig.Tables.SourceCode.Name,
        UpdateExpression : "SET #C = :newC"
    };
    dynamoDB.updateItem(params, function(error,data){
        callBack(error, data);
    });
};

/**
 * Delete existed source
 * @param userName : username
 * @param fileName : filename
 * @param callBack
 */
exports.deleteSourceFile = function (userName, fileName, callBack) {

};

/**
 * Check a source file is existed or not
 * @param userName
 * @param fileName
 * @param callBack
 */
exports.isExistedSourceFile = function (userName, fileName,callBack) {

};

/**
 * Get source file information
 * @param userName : username
 * @param fileName : file name
 * @param callBack
 */
exports.getSourceFile = function (userName, fileName, callBack) {
    AWS.config.update(DBConfig.AwsConfig);
    var dynamoDb = new AWS.DynamoDB();
    var partitionKey = DBConfig.Tables.SourceCode.KeySchema.PartitionKey.ColumnName;
    var sortKey = DBConfig.Tables.SourceCode.KeySchema.SortKey.ColumnName;
    var params = {
        TableName:DBConfig.Tables.SourceCode.Name,
        Key: {
            [partitionKey]: {
                [DBConfig.Tables.SourceCode.KeySchema.Columns.UserName.Type]: userName
            },
            [sortKey]: {
                [DBConfig.Tables.SourceCode.KeySchema.Columns.FileName.Type] : fileName
            }
        }
    };
    dynamoDb.getItem(params,function (error, data) {
        callBack(error,data);
    });
};

/**
 * Filter source file of an user by filter params
 * @param userName : username
 * @param filterParams : an object include list filter params {attributeName, value}
 * @param callBack
 */
exports.filterSourceFile = function (userName, filterParams, callBack) {

};

/**
 * Get Page List Source Code
 * @param pageSize
 * @param startKey {UserName, FileName}
 * @param userName
 * @param callBack
 * Note: The first item is scanned is after startKey
 */
exports.getUserSourceCodesPageList = function ( pageSize, startKey, userName,callBack) {
    AWS.config.update(DBConfig.AwsConfig);
    var dynamoDb = new AWS.DynamoDB();
    if(startKey!=null){
        var params = {
            TableName:DBConfig.Tables.SourceCode.Name,
            Limit : pageSize,
            ExclusiveStartKey :{
                [DBConfig.Tables.SourceCode.KeySchema.PartitionKey.ColumnName] : {
                    [DBConfig.Tables.SourceCode.KeySchema.Columns.UserName.Type]: startKey.UserName
                },
                [DBConfig.Tables.SourceCode.KeySchema.SortKey.ColumnName]: {
                    [DBConfig.Tables.SourceCode.KeySchema.Columns.FileName.Type]: startKey.FileName
                }
            },
            ExpressionAttributeValues:{
                ":u" : {
                    [DBConfig.Tables.SourceCode.KeySchema.Columns.UserName.Type] : userName
                }
            },
            ExpressionAttributeNames:{
                "#UN": "UserName",
                "#LG" : "Language"
            },
            KeyConditionExpression : "#UN = :u",
            ProjectionExpression: "UserName, FileName, Content, #LG, DateCreated, LastUpdated"
        };
    }else{
        var params = {
            TableName:DBConfig.Tables.SourceCode.Name,
            Limit : pageSize,
            ExpressionAttributeValues:{
                ":u" : {
                    [DBConfig.Tables.SourceCode.KeySchema.Columns.UserName.Type] : userName
                }
            },
            ExpressionAttributeNames:{
                "#UN": "UserName",
                "#LG" : "Language"
            },
            KeyConditionExpression : "#UN = :u",
            ProjectionExpression: "UserName, FileName, Content, #LG, DateCreated, LastUpdated"
        };
    };
    dynamoDb.query(params,function (error, data) {
        callBack(error,data);
    });
};