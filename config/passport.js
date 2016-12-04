// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../app/server/classes/user.js');

// expose this function to our app using module.exports
module.exports = function(passport, bcrypt) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.studentnumber);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            delete user.password;
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'studentnumber',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, studentnumber, password, done) {
            // asynchronous User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                User.findOne(studentnumber, function(err, isStudentNumberAvailable, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with studentnumber
                    if (!isStudentNumberAvailable) {
                        console.log("Found a user");
                        return done(null, false, req.flash('signupMessage', 'The student number is already taken.'));
                    } else {
                        // if there is no user with the student number
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.studentnumber = studentnumber;
                        newUser.type = req.body.type;
                        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                        return done(null, newUser);
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'studentnumber',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, studentnumber, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne(studentnumber, function(err, isUserNull, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (isUserNull) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                // if the user is found but the password is wrong
                if (req.body.type != user.type || !bcrypt.compareSync(password, user.password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password or account type.'));
                }
                console.log("password matches!");
                // all is well, return successful user
                return done(null, user);
            });
        }));
};