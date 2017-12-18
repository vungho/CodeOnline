const express = require('express');
const fs = require('fs');
const router = express.Router();
const userService = require('../modules/dynamoDB/UserServices');
const cCompiler = require('../modules/C_Compiling')

var jwt    = require('jsonwebtoken');

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

router.post('/codecompiling', (req, res) => {
    let iCode = req.body;
    console.log(iCode)
    cCompiler.codeCompiling(iCode.sourceCode, iCode.inputs, function (data) {
        console.log(data);
        res.json(data);
    })
});

router.get('/usercode/:userName/:limit/:offset', (req, res) => {
    res.json({wee: ':(('});
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