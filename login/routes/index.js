var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var formidable = require('formidable');
var session = require('cookie-session');
var passport = require('passport');

AWS.config.update({
    accessKeyId: "dien_accesskey_vao_day",
    secretAccessKey: "dien_secretkey_vao_day",
    region: "us-east-2"
});

console.log('log in');
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var form = new formidable.IncomingForm();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
    form.parse(req, function (err, fields, files) {
        var val = fields;
        var userName = val.username;
        var password = val.password;
        console.log(userName);
        console.log(password);

        // create table 'UserCodingOnline' in DynamoDB include 4 attribute: username, password, email, repassword
        var params = {
            TableName: 'UserCodingOnline',
            Key:{
                "username": userName,
                "password": password
            }
        };

        docClient.get(params, function(err1, data1) {
            if (err1) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err1, null, 2));
                res.render('error');
            } else {
                    console.log("GetItem succeeded:", JSON.stringify(data1, null, 2));
                    var check_username, check_password;
                    for(var key in data1){
                        check_username = data1[key].username;
                        check_password = data1[key].password;
                    }

                    if(check_username == userName && check_password == password){
                        console.log('ok');
                        return res.render('success');
                    } else {
                        return res.render('index');
                    }
                }
        });
    });
});

module.exports = router;
