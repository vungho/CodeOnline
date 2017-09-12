const express = require('express');
var fs = require('fs');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({'mess': 'welcome api'});
});

module.exports = router;