/*
var express = require('express');
var app = express();
var loginRoutes = require('./app/server/routes/login-routes.js');
var applicantRoutes = require('./app/server/routes/applicant-routes.js');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

// set up for DB
var promise = require('bluebird');
var dbConfig = require('./config/database');
var options = {
    promiseLib: promise
};

// set up db
var pgp = require('pg-promise')(options);
var config = process.env.DATABASE_URL || dbConfig;
var db = pgp(config);

// test connection to db
var client = db.any("select * from Login")
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        throw err;
    });


// set up for passport
var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport, bcrypt);

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

app.set('db', db);

loginRoutes(app, passport);

app.get('/all-applicants', applicantRoutes.getAllApplicants);

app.get('/applicants-for-course', applicantRoutes.getApplicantsForCourse);

app.get('/applicants-for-course-with-degree', applicantRoutes.getApplicantsForCourseWithDegree);

app.get('/applicant-info', applicantRoutes.getApplicantInfo);

app.post('/add-applicant', applicantRoutes.addApplicant);

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

app.listen(port);
console.log('Listening on port ' + port);
*/

var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var app = express();

var compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/app/public/www'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});