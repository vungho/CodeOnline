const express = require('express');
var fs = require('fs');
const router = express.Router();
const userService = require('../modules/dynamoDB/UserServices');

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

router.post('/register', (req, res) => {
    let user = req.body;
    userService.isExistedUser(user.userName, user.openIdType, function (data){
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
});

module.exports = router;