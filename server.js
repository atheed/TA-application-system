
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

// React (webpack) compilation
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/app/public/client'));
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

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

app.get('/all-courses', applicantRoutes.getAllCourses);

app.get('/course-info', applicantRoutes.getCourseInfo);

app.get('/applicants-for-course', applicantRoutes.getApplicantsForCourse);

app.get('/applicants-for-course-with-degree', applicantRoutes.getApplicantsForCourseWithDegree);

app.get('/applicant-info', applicantRoutes.getApplicantInfo);

app.post('/add-applicant', applicantRoutes.addApplicant);

app.post('/make-offer', applicantRoutes.makeOffer);

app.post('/consider-applicant', applicantRoutes.considerApplicant);

app.post('/add-course-to-cart', applicantRoutes.addCourseToCart);

app.delete('/remove-course-from-cart', applicantRoutes.removeCourseFromCart);

app.get('/courses-in-cart', applicantRoutes.getCoursesInCart);

app.post('/rank-course', applicantRoutes.rankCourse);

app.post('/update-experience-in-course', applicantRoutes.updateExperienceInCourse);


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