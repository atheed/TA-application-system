
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

exports.getAllApplicants = function(req, res, next) {
  db.any('select * from Applicants')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL applicants'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// router.post('/applicants', routes.addApplicant);

// router.delete('/applicants', routes.deleteApplicant);

// router.get('/courses', routes.getCourses);

