var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var api = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


app.use('/', index);
app.use('/api', api);

// ---> authentication

// //passport config
app.use(session({
    secret: 'SGhisSK@17!',
    resave: false,
    saveUninitialized: false,
}));

passport.serializeUser(function (user, done) {
    //console.log('SERIALIZE USER = ' + user.userName);
    done(null, user.user_id);
});

passport.deserializeUser(function (id, done) {
    //console.log('DESERIALIZE USER = ' + id);
    query.user.getUserLoginInfoByUserId(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        query.user.getUserLoginInfoByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            bcrypt.compare(password, user.login_hash, function (err, res) {
                if (err) {
                    return done(null, false, {message: 'Error on compare password.'});
                } else {
                    if (res) {
                        //console.log(username + ' logged in.');
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                }
            });
        })
    }
));

app.use(passport.initialize());
app.use(passport.session());


//----------------------> end authentication

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
