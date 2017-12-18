var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');

/* GET home page. */
router.route('/').get(function (req, res) {
    return res.redirect('/guest');
});

router.route('/guest').get(function (req, res) {
    return res.render('guest', { title: 'Code online' });
});

router.route('/member').get(function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token)
    return res.render('member', { title: 'Code online' });
    if (token) {
        jwt.verify(token, 'jsonwebtoken', function(err, decoded) {
            req.decoded = decoded;
            if (err) {
                return res.redirect('/guest');
            } else {
                return res.render('member', { title: 'Code online' });
            }
        });
    } else {
        return res.redirect('/guest');
    }
});

module.exports = router;
