var express = require('express');
var app = express();
var loginRoutes = require('./app/server/routes/login-routes.js');
var applicantRoutes = require('./app/server/routes/applicant-routes.js');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// set up for DB
var promise = require('bluebird');

var options = {
    promiseLib: promise
};

// set up db
var pgp = require('pg-promise')(options);
var cn = {
    host: 'localhost',
    port: 5432,
    database: 'tapp',
    user: 'postgres',
    password: 'superuser'
}
var db = pgp(cn);

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

app.listen(port);
console.log('Listening on port ' + port);
