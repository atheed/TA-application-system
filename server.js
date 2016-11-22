var express = require('express');
var app = express();
var loginRoutes = require('./app/server/routes/login-routes.js')
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// set up for DB
var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
        .query('SELECT table_schema,table_name FROM information_schema.tables;')
        .on('row', function(row) {
            console.log(JSON.stringify(row));
        });
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

loginRoutes(app, passport);

app.listen(port);
console.log('Listening on port ' + port);
