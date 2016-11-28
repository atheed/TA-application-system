'use strict';

// ------ APIs FOR TA COORDINATOR -----

exports.getAllApplicants = function(req, res, next) {
    var db = req.app.get('db');
    db.any('select * from Applicants')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL applicants'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/* Returns data of the form:
  "data": [
    {
      "code": "CSC108",
      "title": "Intro to CS",
      "instructor": "J Smith",
      "numberoftas": 50
    },
    {
      "code": "CSC120",
      "title": "Intro to CS for Science",
      "instructor": "Prof 2",
      "numberoftas": 25
    }
  ]
*/
exports.getAllCourses = function(req, res, next) {
    var db = req.app.get('db');
    db.any('SELECT * FROM Courses')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL courses'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/* Returns data of the form:
  "data": {
    "code": "CSC108",
    "title": "Intro to CS",
    "instructor": "J Smith",
    "numberoftas": 50,
    "qualifications": [
      "Able to teach 1st years patiently"
    ]
  },
*/
exports.getCourseInfo = function(req, res, next) {
    var db = req.app.get('db');

    let type = req.user.type;
    if (req.query.course) {
        db.task(function*(t) {

                let info = yield t.one(
                    "SELECT * \
                FROM Courses \
                WHERE Code=${course}", req.query);

                let qualificationList = yield t.any(
                    "SELECT Qualification \
                FROM CourseQualifications \
                WHERE Code=${course}", req.query);

                let qualifications = { "qualifications": flattenArray(qualificationList) }

                if (type === "admin") {
                    // display the course info, as well as the applicants

                    let applicantList = yield t.any(
                       'SELECT a.StudentNumber, FamilyName, GivenName, Year, Degree, Qualifications, Rank, Experience \
                        FROM Applicants a \
                        INNER JOIN Rankings r \
                        ON a.StudentNumber=r.StudentNumber \
                        WHERE CourseCode = ${course} \
                        ORDER BY Rank', // TODO: order by something else probably
                    req.query);

                    let applicants = { "applicants": applicantList }
                    return Object.assign(info, qualifications, applicants);

                } else {
                    return Object.assign(info, qualifications);
                }
            })
            .then(function(applicantInfo) {
                // success;
                console.log(applicantInfo);
                res.status(200)
                    .json({
                        status: 'success',
                        data: applicantInfo,
                        message: 'Retrieved applicant info'
                    });
            })
            .catch(function(err) {
                return next(err);
            });

    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}



/* Get all the applicants for a particular course */
exports.getApplicantsForCourse = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.course) {
        console.log("course");
        db.any(
                'SELECT a.StudentNumber, FamilyName, GivenName, Year, Degree, Qualifications, Rank, Experience \
	    	FROM Applicants a \
	    	INNER JOIN Rankings r \
			ON a.StudentNumber=r.StudentNumber \
	    	WHERE CourseCode = $1',
                req.query.course)
            .then(function(data) {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrieved ALL applicants for course'
                    });
            })
            .catch(function(err) {
                return next(err);
            });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

/* Get all the applicants for a particular course */
exports.getApplicantsForCourseWithDegree = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.course && req.query.degree) {
        db.any(
                'SELECT a.StudentNumber, FamilyName, GivenName, Year, Degree, Qualifications, Rank, Experience \
	    	FROM Applicants a \
	    	INNER JOIN Rankings r \
			ON a.StudentNumber=r.StudentNumber \
	    	WHERE CourseCode = ${course} AND Degree = ${degree}',
                req.query)
            .then(function(data) {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrieved ALL applicants for course'
                    });
            })
            .catch(function(err) {
                return next(err);
            });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

/* Returns data in the form
{
	"data": {
		"studentnumber" :
		"familyname" :
		...
		"rankings" : [
			{
				"coursecode":
				"rank":
				"experience":
			}
		],
		"offers" : [
            {
                "coursecode":
            }
        ],
        "considerations" : [
            {
                "coursecode":
            }
        ]
	}
}

 */
/* Get all the info for a particular applicant */
exports.getApplicantInfo = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.stunum) {
        db.task(function*(t) {
                let info = yield t.one(
                    "SELECT * \
				FROM Applicants \
				WHERE StudentNumber=${stunum}", req.query);

                let rankingList = yield t.any(
                    "SELECT CourseCode, Rank, Experience \
				FROM rankings \
                WHERE StudentNumber=${stunum}", req.query);

                let rankings = { "rankings": rankingList }

                let offerList = yield t.any(
                    "SELECT CourseCode \
                FROM Offers \
                WHERE StudentNumber=${stunum} AND Status='offered'", req.query);

                let offers = { "offers": offerList }

                let considerList = yield t.any(
                    "SELECT CourseCode \
                FROM Offers \
                WHERE StudentNumber=${stunum} AND Status='considered'", req.query);

                let considerations = { "considerations": considerList }

                return Object.assign(info, rankings, offers, considerations);
            })
            .then(function(applicantInfo) {
                // success;
                console.log(applicantInfo);
                res.status(200)
                    .json({
                        status: 'success',
                        data: applicantInfo,
                        message: 'Retrieved applicant info'
                    });
            })
            .catch(function(err) {
                return next(err);
            });

    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

exports.makeOffer = function(req, res, next) {
    var db = req.app.get('db');
    // TODO : maybe it should be req.body?
    if (req.query.stunum && req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Offers \
                VALUES(${stunum}, ${course}, 'offered')\
                ON CONFLICT (StudentNumber, CourseCode) DO UPDATE SET Status = 'offered'",
                req.query)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Made offer to applicant'
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

exports.considerApplicant = function(req, res, next) {
    var db = req.app.get('db');
    // TODO : maybe it should be req.body?
    if (req.query.stunum && req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Offers \
                VALUES(${stunum}, ${course}, 'considered')\
                ON CONFLICT (StudentNumber, CourseCode) DO UPDATE SET Status = 'considered'",
                req.query)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Considered applicant for course'
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}


// ----------- APIs FOR APPLICANT VIEW ------------

exports.addApplicant = function(req, res, next) {
    var db = req.app.get('db');

    db.task(function*(t) {
            let rankings = req.body.rankings;
            console.log(req.body);
            let addInfo = t.none(
                'INSERT INTO Applicants \
            VALUES(\
                ${StudentNumber}, ${FamilyName}, ${GivenName}, ${Year}, ${Degree}, ${Qualifications})',
                req.body);

            var queries = rankings.map(function(l) {
                console.log(l);
                return t.none("INSERT INTO rankings(StudentNumber, CourseCode, Rank, Experience) VALUES($1, $2, $3, $4)", [req.body.StudentNumber, l.coursecode, l.rank, l.experience]);
            });
            queries.push(addInfo);
            return t.batch(queries);
        })
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one applicant'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

exports.addCourseToCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.studentnumber;
    // var stunum = req.user.studentnumber;
    if (req.body.course) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Rankings \
                VALUES($1, $2, 0, 0)\
                ",
                [stunum, req.body.course])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Added course to cart'
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

exports.removeCourseFromCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.query.studentnumber;
    // var stunum = req.user.studentnumber;
    if (req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.result(
                "DELETE FROM Rankings \
                WHERE StudentNumber=$1 AND CourseCode=$2",
                [stunum, req.query.course])
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} course from cart`
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

/* Get all the applicants for a particular course */
exports.getCoursesInCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.query.studentnumber;
    // var stunum = req.user.studentnumber;

    db.any(
        'SELECT CourseCode, Rank, Experience\
        FROM Rankings \
        WHERE StudentNumber=$1',
            stunum)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved courses in cart'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/* Get all the applicants for a particular course */
exports.rankCourse = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.studentnumber;
    // var stunum = req.user.studentnumber;
    if (req.body.course && req.body.rank) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "UPDATE Rankings \
                SET Rank=$1\
                WHERE StudentNumber=$2 AND CourseCode=$3",
                [req.body.rank, stunum, req.body.course])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Ranked course'
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

/* Get all the applicants for a particular course */
exports.updateExperienceInCourse = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.studentnumber;
    // var stunum = req.user.studentnumber;
    if (req.body.course && req.body.experience) {
        console.log(req.body);
        db.none(
                "UPDATE Rankings \
                SET Experience=$1\
                WHERE StudentNumber=$2 AND CourseCode=$3",
                [req.body.experience, stunum, req.body.course])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Experience in course'
                });
        })
        .catch(function(err) {
            return next(err);
        });
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

exports.getAllQualifications = function(req, res, next) {
    var db = req.app.get('db');
    db.any('SELECT DISTINCT Qualification FROM CourseQualifications')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: flattenArray(data),
                    message: 'Retrieved ALL qualifications'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/* Flatten an array of objects with only one field into an array of just 
their values */
function flattenArray(arr) {
    console.log(arr);
    console.log(Object.keys(arr[0]));
    let key = Object.keys(arr[0])[0];
    return arr.map(
        function(x) {
            return x[key];
        }
    )
}
