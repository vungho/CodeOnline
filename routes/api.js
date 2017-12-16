const express = require('express');
var fs = require('fs');
const router = express.Router();
const userService = require('../modules/dynamoDB/UserServices');

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

router.post('/register', (req, res) => {
    let user = req.body;
    userService.isExistedUser(user.UserName, user.OpenIdType, function (data){
        if (data === true){
            res.json({result: {error: 'User is exit'}});
        }else{
            userService.createNewUser(user, function (data) {
                if (data.error){
                    res.json({result: {error: 'Fail'}});
                }
                res.json(data);
            });
        }
    })
});

router.post('/login', (req, res) => {
    //login
    let user = req.body;
    userService.getUserDetails(user.UserName, user.OpenIdType, function (error, data) {
        if (error){
            console.log(error)
            res.json({result: {error: 'User is not exit'}});
        }else{
            console.log(data);
            res.json(data);
        }
    })
});

module.exports = router;