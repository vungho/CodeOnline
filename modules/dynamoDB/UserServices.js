/*
 * This is not the best way to implement but fast and suitable with this project
 */

var AWS = require("aws-sdk");
var DBConfig = require("./DBConfig");

/**
 * Create New User, if openIdType is not "Google" or "Facebook" user password will undefine
 * @param user : User information
 * @param callBack
 */
exports.createNewUser = function (user, callBack) {

    AWS.config.update(DBConfig.AwsConfig);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: DBConfig.Tables.User.Name,
        Item: user
    };
    docClient.put(params, callBack(error, data));
};

/**
 * Get user details information
 * @param userName : username
 * @param openIdType : login type
 * @param callBack
 */
exports.getUserDetails = function (userName, openIdType, callBack) {
    AWS.config.update(DBConfig.AwsConfig);
    var dynamoDb = new AWS.DynamoDB();
    var partitionKey = DBConfig.Tables.User.KeySchema.PartitionKey.ColumnName;
    var sortKey = DBConfig.Tables.User.KeySchema.SortKey.ColumnName;
    var params = {
        Key: {
            [partitionKey]: {
                [DBConfig.Tables.User.Columns.UserName.Type]: userName
            },
            [sortKey] : {
                [DBConfig.Tables.User.Columns.OpenIdType.Type] : openIdType
            }
        },
        TableName: DBConfig.Tables.User.Name
    };
    dynamoDb.getItem(params,callBack(error, data));
};

/**
 * Check an user is existed or not
 * @param userName : username
 * @param openIdType : login type
 * @param callBack true if user is existed and false if not
 */
exports.isExistedUser = function (userName, openIdType, callBack) {
    this.getUserDetails(userName,openIdType,function (error,data) {
       if(data!=null){
           callBack(true);
       }else
           callBack(false);
    });
};

/**
 * Get all user in database
 * @param callBack
 */
exports.getAllUser = function (callBack) {
    
};

exports.getUserPasswordByUserName = function (userName, callBack) {
    this.getUserDetails(userName, DBConfig.OpenIdType.OnlineCodeSystem, function (error,data) {
        callBack(error, data.Item.Password);
    });
};