module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });

    app.get('/login', function(req, res) {
        res.json({
            success: false
        });
    });

    app.get('/signup', function(req, res) {
        res.json({
            success: false
        });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        console.log("Request user is");
        console.log(req.user);

        res.json({
            success: true,
            user: req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
