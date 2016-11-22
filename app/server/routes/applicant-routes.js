// app.post('/applicants', routes.addApplicant);

// app.delete('/applicants', routes.deleteApplicant);

// app.get('/courses', routes.getCourses);


// using DB


// router.get('/api/puppies', db.getAllPuppies);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);


// app.get('/applicants', applicantRoutes.getApplicants);
'use strict';

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
		]
		"offers" :
	}
}

 */
/* Get all the info for a particular applicant */
exports.getApplicantInfo = function(req, res, next) {
    var db = req.app.get('db');

    if (req.query.stunum) {
        db.task(function*(t) {
                let info = yield t.one(
                    "SELECT  \
				FROM Applicants \
				WHERE StudentNumber=${stunum}", req.query);

                let rankingList = yield t.any(
                    "SELECT CourseCode, Rank, Experience \
				FROM rankings \
				WHERE StudentNumber=${stunum}", req.query);

                let rankings = { "rankings": rankingList }
                return Object.assign(info, rankings);
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


// router.post('/applicants', routes.addApplicant);

// router.delete('/applicants', routes.deleteApplicant);

// router.get('/courses', routes.getCourses);
