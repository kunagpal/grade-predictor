var router = require('express').Router();
var temp;

// GET users listing.
router.get('/grades', function(req, res){
    if(req.signedCookies.name)
    {
        res.render('grades', {name : req.signedCookies.name});
    }
    else
    {
        res.redirect('/login');
    }
});

//GET login page
router.get('/login', function(req, res){
        if(req.signedCookies.name)
        {
            res.redirect('/home');
        }
        else
        {
            temp = req.session.msg ? req.session.msg : 0;
            delete req.session.msg;
            res.render('login', {token : req.csrfToken(), msg : temp});
        }
});

//GET signup page
router.get('/signup', function(req, res){
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('signup', {token : req.csrfToken(), msg : temp});
});

//GET developers page
router.get('/developers', function(req, res){
    res.render('developers');
});

//GET logout page
router.get('/logout', function(req, res){
    if(req.signedCookies.name)
    {
        res.clearCookie('name');
        res.redirect('/login');
    }
});

// GET forgot password page
router.get('/forgot', function(req, res) {
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('forgot', {token : req.csrfToken(), msg : temp});
});

// GET details page
router.get('/details', function(req, res) {
    if(req.signedCookies.name)
    {
        temp = req.session.msg ? req.session.msg : 0;
        delete req.session.msg;
        res.render('details', {token : req.csrfToken(), msg : temp, name : req.signedCookies.name});
    }
    else
    {
        res.redirect('/login');
    }
});

// GET grades page
router.get('/grades', function(req, res) {
    if(req.signesCookies.name)
    {
        temp = req.session.msg ? req.session.msg : 0;
        delete req.session.msg;
        res.render('grades', {token : req.csrfToken(), msg : temp, name : req.signedCookies.name});
    }
    else
    {
        res.redirect('/login');
    }
});

// GET prediction page
router.get('/predict', function(req, res) {
    if(req.signedCookies.name)
    {
        temp = req.session.msg ? req.session.msg : 0;
        delete req.session.msg;
        res.render('predict', {token : req.csrfToken(), msg : temp, name : req.signedCookies.name});
    }
    else
    {
        res.redirect('/login');
    }
});

// GET home page
router.get('/home', function(req, res) {
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('home', {token : req.csrfToken(), msg : temp, name : req.signedCookies.name});
});

// GET help page
router.get('/help', function(req, res) {
    res.render('help');
});

// GET feedback page
router.get('/feedback', function(req, res) {
    if(req.signedCookies.name)
    {
        res.render('feedback', {token : req.csrfToken()});
    }
    else
    {
        res.redirect('/login');
    }
});

// Generic get route request handler
router.get(/\/.*/, function(req, res) {
  res.render('index');
});

module.exports = router;