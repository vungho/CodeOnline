var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.user.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy(
    function (username,password,done) {
        db.user.find({where : {
            username : username
        }}).then(function (user) {
            bcrypt.compare(password, user.password, function (err,result) {
                if (err) { return done(err); }
                if(!result) {
                    return done(null, false, { message: 'Incorrect username and password' });
                }
                return done(null, user);
            })
        }).catch(function (err) {
            return done(err);
        })
    }
))