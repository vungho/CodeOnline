var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('guest', { title: 'Code online' });
});

module.exports = router;
