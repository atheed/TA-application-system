var express = require('express');
var app = express();
var loginRoutes = require('./app/server/routes/login-routes.js')
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// set up for DB
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/courses';
var db = pgp(connectionString);


// set up for passport
var passport = require('passport');
var flash = require('connect-flash');

app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', './app/server/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'randomtho',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

loginRoutes(app, passport);

app.get('/applicants', applicantRoutes.getApplicants);

app.listen(port);
console.log('Listening on port ' + port);
