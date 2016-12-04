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

    app.get('/profile', function(req, res) {
        console.log('profile', req.user);
        if (req.isAuthenticated())
            return res.json({ success: true, user: req.user });
        else
            return res.json({ success: false, user: null });

    });


    app.get('/authenticate', function(req, res) {
        console.log('authenticate', req.user);
        if (req.isAuthenticated())
            return res.json({ success: true, user: req.user });
        else
            return res.json({ success: false, user: null });
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