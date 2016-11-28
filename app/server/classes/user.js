// set up for DB
var promise = require('bluebird');
var dbConfig = require('../../../config/database.js');
var options = {
    promiseLib: promise
};

// set up db
var pgp = require('pg-promise')(options);
var config = process.env.DATABASE_URL || dbConfig;
var db = pgp(config);

function User(studentnumber, password, type) {
    this.studentnumber = studentnumber;
    this.password = password;
    this.type = type;
    this.save = function(callback) {
        console.log(this.studentnumber + ' will be saved');
        db.any('INSERT INTO Login(studentnumber, password, type) VALUES($1, $2, $3)', [this.studentnumber, this.password, this.type])
            .then(function(data) {
                console.log("Data added " + data);
                callback(null);
            })
            .catch(function(error) {
                console.log("There was an error " + error);
                callback(null);
            });
    };
}

User.findOne = function(studentnumber, callback) {
    // callback has 3 field (error, isStudentNumberAvailable, the User object)
    db.oneOrNone('SELECT * FROM Login WHERE studentnumber = $1', [studentnumber])
        .then(function(data) {
            callback(false, (data === null), data);
        })
        .catch(function(error) {
            console.log("There was an error " + error);
            callback(error, false, this);
        });
};

User.findById = function(studentnumber, callback) {
    db.one('SELECT * FROM Login WHERE studentnumber = $1', [studentnumber])
        .then(function(data) {
            this.studentnumber = data.username;
            this.password = data.password;
            callback(null, data);
        })
        .catch(function(error) {
            console.log("Throwing error " + error);
            callback(error, null);
        });
};

module.exports = User;
