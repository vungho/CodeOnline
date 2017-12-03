const express = require('express');
var fs = require('fs');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

//Dành cho đang nhập
router.post('/login', (req, res)=>{
    // --> code ở đây
});

//Dành cho đăng ký
router.post('/register', (req, res)=>{
    //-- > Code ở đây
});

module.exports = router;