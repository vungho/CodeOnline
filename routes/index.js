var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get(function (req, res) {
    return res.redirect('/guest');
});

router.route('/guest').get(function (req, res) {
    return res.render('guest', { title: 'Code online' });
});

router.route('/member').get(function (req, res) {
    return res.render('member', { title: 'Code online' });
});


module.exports = router;
