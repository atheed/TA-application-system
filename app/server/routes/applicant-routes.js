'use strict';

var DUPLICATE_KEY_ERR_CODE = '23505';
module.exports = function(app, passport) {
    // ------ APIs FOR TA COORDINATOR -----

    app.get('/all-applicants', getAllApplicants);

    app.get('/all-courses', getAllCourses);

    app.get('/course-info', getCourseInfo);

    app.get('/applicants-for-course', getApplicantsForCourse);
    app.get('/applicants-for-course-with-degree', getApplicantsForCourseWithDegree);
    app.get('/applicant-info', getApplicantInfo);
    app.post('/add-applicant', addApplicant);

    app.post('/make-offer', makeOffer);
    app.delete('/unoffer', unOfferApplicant);

    app.post('/consider-applicant', considerApplicant);
    app.delete('/unconsider-applicant', unConsiderApplicant);

    app.post('/add-course-to-cart', addCourseToCart);

    app.delete('/remove-course-from-cart', removeCourseFromCart);

    app.get('/courses-in-cart', getCoursesInCart);
    app.get('/courses-in-cart-with-rank', getCoursesInCartWithRank);

    app.post('/submit-rankings', submitRankings);

    app.post('/rank-course', rankCourse);

    app.post('/update-experience-in-course', updateExperienceInCourse);
    app.get('/all-qualifications', getAllQualifications);
}

var getAllApplicants = function(req, res, next) {
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
var getAllCourses = function(req, res, next) {
    console.log(req.user);
    var db = req.app.get('db');
    let type = "student";
    // let type = req.user.type;

    db.task(function*(t) {

            if (type === "student") {
                // display the course info, as well as the applicants
                let stunum = req.query.studentnumber;
                // let stunum = req.user.studentnumber;

                return t.any(
                    'SELECT Code, Title, NumberOfTAs, Instructor, InCart \
                    FROM Courses c \
                    LEFT JOIN \
                    (SELECT CourseCode, true as InCart \
                    FROM Cart \
                    WHERE StudentNumber = $1) AS CartInfo \
                    ON c.Code=CartInfo.CourseCode',
                    [stunum]);
                    // 'SELECT CourseCode, true as InCart \
                    // FROM Cart \
                    // WHERE StudentNumber = $1',
                    // [stunum]);

            } else {
                return t.any('SELECT * FROM Courses');

            }
        })
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
var getCourseInfo = function(req, res, next) {
    var db = req.app.get('db');
    console.log(req.user);
    let type = "student";
    // let type = req.user.type;
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
var getApplicantsForCourse = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.course) {
        console.log("course");
        db.any(
                'SELECT a.StudentNumber, FamilyName, GivenName, Year, Degree, Rank, Experience, Status \
	    	FROM Applicants a \
	    	JOIN Rankings r \
			ON a.StudentNumber=r.StudentNumber \
            LEFT JOIN Offers o \
            ON r.StudentNumber=o.StudentNumber AND r.CourseCode=o.CourseCode \
            WHERE r.CourseCode=$1 \
            ORDER BY RANK',
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
var getApplicantsForCourseWithDegree = function(req, res, next) {
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
		"rankings" : {
            1 : [
                "CSC108",
                "CSC148"              
            ],
            2 : [
                "CSC120"   
            ],
            3 : [
            ]
        }
		],
		"offers" : [
            "CSC108"
        ],
        "considerations" : [
            "CSC108",
            "CSC120",
        ]
	}
}

 */
/* Get all the info for a particular applicant */
var getApplicantInfo = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.stunum) {
        db.task(function*(t) {
                let info = yield t.one(
                    "SELECT * \
				FROM Applicants \
				WHERE StudentNumber=${stunum}", req.query);

                let rankedFirst = yield t.any(
                    "SELECT CourseCode \
				FROM rankings \
                WHERE StudentNumber=${stunum} AND Rank=1", req.query);

                let rankedSecond = yield t.any(
                    "SELECT CourseCode \
                FROM rankings \
                WHERE StudentNumber=${stunum} AND Rank=2", req.query);

                let rankedThird = yield t.any(
                    "SELECT CourseCode \
                FROM rankings \
                WHERE StudentNumber=${stunum} AND Rank=3", req.query);

                let rankings = { "rankings": {
                        1 : flattenArray(rankedFirst),
                        2 : flattenArray(rankedSecond),
                        3 : flattenArray(rankedThird) 
                    }
                }

                let offerList = yield t.any(
                    "SELECT CourseCode \
                FROM Offers \
                WHERE StudentNumber=${stunum} AND Status='offered'", req.query);

                let offers = { "offers": flattenArray(offerList) }

                let considerList = yield t.any(
                    "SELECT CourseCode \
                FROM Offers \
                WHERE StudentNumber=${stunum} AND Status='considered'", req.query);

                let considerations = { "considerations": flattenArray(considerList) }

                let qualificationList = yield t.any(
                    "SELECT Qualification \
                FROM StudentQualifications \
                WHERE StudentNumber=${stunum}", req.query);

                let qualifications = { "qualifications": flattenArray(qualificationList) }

                return Object.assign(info, rankings, offers, considerations, qualifications);
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

var makeOffer = function(req, res, next) {
    var db = req.app.get('db');
    if (req.body.stunum && req.body.course) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Offers \
                VALUES(${stunum}, ${course}, 'offered')\
                ON CONFLICT (StudentNumber, CourseCode) DO UPDATE SET Status = 'offered'",
                req.body)
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

var unOfferApplicant = function(req, res, next) {
    var db = req.app.get('db');
    if (req.query.stunum && req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.result(
                "DELETE FROM Offers \
                WHERE StudentNumber=${stunum} AND CourseCode=${course} AND Status='offered'", req.query)
            .then(function(result) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: `Removed ${result.rowCount} course from offers`
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

var considerApplicant = function(req, res, next) {
    var db = req.app.get('db');
    // TODO : maybe it should be req.body?
    if (req.body.stunum && req.body.course) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Offers \
                VALUES(${stunum}, ${course}, 'considered')\
                ON CONFLICT (StudentNumber, CourseCode) DO UPDATE SET Status = 'considered'",
                req.body)
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

var unConsiderApplicant = function(req, res, next) {
    var db = req.app.get('db');
    if (req.query.stunum && req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.result(
                "DELETE FROM Offers \
                WHERE StudentNumber=${stunum} AND CourseCode=${course} AND Status='considered'", req.query)
            .then(function(result) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: `Removed ${result.rowCount} course from offers`
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

var addApplicant = function(req, res, next) {
    var db = req.app.get('db');

    if (!req.user) {
        console.log("not logged in");
        res.status(401)
            .json({
                status: 'failure',
                error: 'You must be logged in to submit an application'
            });
        // res.status(401).json({ error: "You must be logged in to submit an application"});
        return;
    }

    db.tx(function*(t) {
            let qualifications = req.body.qualifications;
            console.log(req.body);
            req.body['studentnumber'] = req.user.studentnumber;
            let addInfo = t.none(
                'INSERT INTO Applicants \
            VALUES(\
                ${studentnumber}, ${FamilyName}, ${GivenName}, ${Year}, ${Degree}, ${Eligibility}, ${OtherInfo})\
                ON CONFLICT (StudentNumber) DO UPDATE \
                SET StudentNumber=${studentnumber}, \
                FamilyName=${FamilyName}, \
                GivenName=${GivenName}, \
                Year=${Year}, \
                Degree=${Degree}, \
                WorkEligibility=${Eligibility}, \
                OtherInfo=${OtherInfo}',
                req.body);

            var queries = [];
            queries.push(addInfo);
            qualifications.forEach(function(l) {
                console.log(l);
                queries.push(t.none("INSERT INTO StudentQualifications VALUES($1, $2) ON CONFLICT DO NOTHING", [req.body.studentnumber, l]));
            });
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
            // if (err.code == DUPLICATE_KEY_ERR_CODE) { // duplicate key
            //     res.status(409)
            //         .json({
            //             status: 'failure',
            //             error: 'This student number already exists'
            //         });
            // } else {
            //     console.log(err);
            //     console.log(err.message);
            //     return next(err);                
            // }
            // console.log(err);
            // console.log(err.message);
            // return next(err);                
            res.status(500).json({ status: 'failure', error: err.message});
        });
}

var addCourseToCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.stunum;
    // var stunum = req.user.studentnumber;
    if (req.body.course) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "INSERT INTO Cart \
                VALUES($1, $2, 0, 0)\
                ", [stunum, req.body.course])
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

var removeCourseFromCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.query.stunum;
    // var stunum = req.user.studentnumber;
    if (req.query.course) {
        console.log(req.query);
        // check if there is already an entry there, if so overwrite it
        db.result(
                "DELETE FROM Cart \
                WHERE StudentNumber=$1 AND CourseCode=$2", [stunum, req.query.course])
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
/*
    "rankings" : {
        1 : [
            {
              "code": "CSC108",
              "title": "Intro to CS",
            }, 
        ],
        2 : [
        ],
        3 : [
        ]
    }
*/
var getCoursesInCart = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.query.stunum;
    // var stunum = req.user.studentnumber;
    db.task(function*(t) {
            let rankings = { "rankings": {} }
            for (let i = 0; i < 6; i++) {
                let rankedIth = yield t.any(
                    'SELECT Courses.Code, Title \
                    FROM Cart \
                    JOIN Courses \
                    ON Cart.CourseCode=Courses.Code \
                    WHERE StudentNumber=$1 AND Rank=$2', [stunum, i]);
                rankings["rankings"][i] = rankedIth;
            }

            return rankings;
        })
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
/* Returns data of the form
{
    "data": [
        {
          "code": "CSC108",
          "title": "Intro to CS",
        },             
    ],
}

*/
/* Get all the applicants for a particular course */
var getCoursesInCartWithRank = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.query.stunum;
    // var stunum = req.user.studentnumber;
    if (req.query.rank) {

        db.any(
                'SELECT Courses.Code, Title \
            FROM Cart \
            JOIN Courses \
            ON Cart.CourseCode=Courses.Code \
            WHERE StudentNumber=${stunum} AND Rank=${rank}',
                req.query)
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
    } else {
        // unrecognized query, send 400 error code
        console.log("error");
        res.status(400);
        res.send("Error: unrecognized query");
    }
}

/* Get all the applicants for a particular course */
var rankCourse = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.stunum;
    // var stunum = req.user.studentnumber;
    if (req.body.course && req.body.rank) {
        console.log(req.body);
        // check if there is already an entry there, if so overwrite it
        db.none(
                "UPDATE Cart \
                SET Rank=$1\
                WHERE StudentNumber=$2 AND CourseCode=$3", [req.body.rank, stunum, req.body.course])
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
var updateExperienceInCourse = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.studentnumber;
    // var stunum = req.user.studentnumber;
    if (req.body.course && req.body.experience) {
        console.log(req.body);
        db.none(
                "UPDATE Cart \
                SET Experience=$1\
                WHERE StudentNumber=$2 AND CourseCode=$3", [req.body.experience, stunum, req.body.course])
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

var submitRankings = function(req, res, next) {
    var db = req.app.get('db');
    var stunum = req.body.stunum;
    // var stunum = req.user.studentnumber;
    db.task(function*(t) {
            let deleteRankings = t.none(
                'DELETE FROM Rankings \
                WHERE Rankings.StudentNumber = $1',
                [stunum]);

            let addFromCart = t.none("INSERT INTO Rankings \
            (SELECT * FROM Cart \
            WHERE Cart.StudentNumber = $1)", [stunum]);

            return t.batch([deleteRankings, addFromCart]);
        })
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Submitted Rankings'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

var getAllQualifications = function(req, res, next) {
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
    if (arr.length === 0) {
        return [];
    }
    let key = Object.keys(arr[0])[0];
    return arr.map(
        function(x) {
            return x[key];
        }
    )
}