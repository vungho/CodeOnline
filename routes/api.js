const express = require('express');
const fs = require('fs');
const router = express.Router();
const userService = require('../modules/dynamoDB/UserServices');
const cCompiler = require('../modules/C_Compiling');
const sourceCode = require('../modules/dynamoDB/SourceCodeServices');
const http = require('http');
const request = require('request');

var jwt    = require('jsonwebtoken');

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

router.post('/savecode', (req, res) => {
    var token = req.headers.authorization;
    console.log(token)
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function(err, decoded) {
            req.decoded = decoded;
            let code = req.body;

            sourceCode.createNewSourceFile(decoded.UserName, code.FileName, code.Content, code.Language,
                function (error, data) {
                    let result = {
                        error: null,
                        data: null
                    };
                    if (error){
                        result.error = error;
                    }else{
                        result.data = data
                    }
                    res.json(result);
                })
        });
    } else {
        res.json({
            error: null,
            data: null
        })
    }
});

router.put('/savecode', (req, res) => {
    let result = {
        error: null,
        data: null
    };
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function(err, decoded) {
            req.decoded = decoded;
            let body = req.body;
            console.log(body)
            let codeContent = {
                sourceCode: body.code.sourceCode,
                inputs: body.code.inputs
            };
            console.log(codeContent)
            sourceCode.updateSourceFile(decoded.UserName, body.fileName, codeContent, function (error, data) {
                if (error){
                    result.error = error;
                }else{
                    result.data = data
                }
                res.json(result);
            })
        });
    } else {
        res.json(result)
    }
});

// router.post('/codecompiling', (req, res) => {
//     let iCode = req.body;
//     console.log(iCode)
//     cCompiler.codeCompiling(iCode.sourceCode, iCode.inputs, function (data) {
//         console.log(data);
//         res.json(data);
//     })
// });

router.post('/codecompiling', (req, mainRes) => {
    let iCode = req.body;
    console.log(iCode)

    var program = {
        script : iCode.sourceCode,
        stdin : iCode.inputs,
        language: iCode.complierLanguage ? iCode.complierLanguage : 'cpp',
        versionIndex: "0",
        clientId: "7882eb43f1fa1034b8b900eceecf57fc",
        clientSecret:"5484c92255c06efaeffd137889cade2602f6eaebb9766c81e79a05d07cf2c703"
    };
    request({
            url: 'https://api.jdoodle.com/execute',
            method: "POST",
            json: program
        },
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            mainRes.json(body);
        });
});

router.get('/usercode/:limit/:filename', (req, res) => {
    let result = {
        error: null,
        data: null
    };

    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function(err, decoded) {
            req.decoded = decoded;
            let params = req.params;
            console.log(decoded)
            console.log(params);

            if ( params['filename'] && params['limit']){
                let filename = params['filename'];
                let limit = params['limit'];

                if (filename === -1){
                    sourceCode.getUserSourceCodesPageList(limit, null, decoded.UserName, function (error, data) {
                        if (error){
                            result.error = error
                        }else{
                            result.data = data;
                        }
                        res.json(result);
                    })
                }else{
                    let startKey = {
                        UserName: decoded.UserName,
                        FileName: filename
                    };
                    sourceCode.getUserSourceCodesPageList(limit, startKey, decoded.UserName, function (error, data) {
                        if (error){
                            result.error = error
                        }else{
                            result.data = data;
                        }
                        res.json(result);
                    })
                }
            }
        });
    } else {
        res.json(result)
    }
});

router.post('/register', (req, res) => {
    let user = req.body;
    userService.isExistedUser(user.UserName, user.OpenIdType, function (data){
        if (data === true){
            res.json({result: {error: 'User is exit'}});
        }else{
            userService.createNewUser(user, function (newUser) {
                if (newUser.error){
                    res.json({result: {error: 'Fail'}});
                }else{
                    res.json(newUser);
                }

            });
        }
    })
});

router.post('/login', (req, res) => {
    //login
    let user = req.body;
    user['OpenIdType'] = 'None';
    userService.getUserDetails(user.UserName, user.OpenIdType, function (error, data) {
        if (error){
            res.json({result: {error: 'User is not exit'}});
        }else{
            if (data){
                console.log(data);
                if (data.Item.Password.S.localeCompare(user.Password) === 0){
                    var token = jwt.sign(user, 'jsonwebtoken');
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }else{
                    res.json({result: {error: 'User is not exit'}});
                }
            }else{
                res.json({result: {error: 'User is not exit'}});
            }
        }
    })
});

router.route('/info').get(function (req, res) {
    var token = req.headers.authorization;
    console.log(token)
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function(err, decoded) {
            req.decoded = decoded;
            res.json(decoded)
        });
    } else {
        res.json(undefined)
    }
});

module.exports = router;