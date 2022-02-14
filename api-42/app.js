const express = require('express')
const app = express()
const port = 3000
var FortyTwoStrategy = require('passport-42').Strategy;
var passport = require('passport');
var logger = require('morgan');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var hello = "";

passport.use(new FortyTwoStrategy({
    clientID: '9a11d200f383e32da84ca7a946dbbc13b0cdd83d0bb81790debee361aedb0d21',
    clientSecret: 'b8457abbcb58b51f9d6d4082b7a708e24fa767bff71056c28135f053bb2e2c6b',
    callbackURL: "http://127.0.0.1:3000/login/42/return",
    profileFields: {
        'username': 'login',
        'displayName': 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
      }
  },
  function(accessToken, refreshToken, profile, cb) {
    hello = profile.username;
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  

var User = {

}

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ resave: false, saveUninitialized: false, secret: '!terceS' }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ resave: false, saveUninitialized: false, secret: '!terceS' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/42',
  passport.authenticate('42'));

app.get('/login/42/return',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  
app.get('/', (req, res) => {
  res.send("hello " + hello);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
