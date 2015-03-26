var router = require('express').Router();
var temp;

// GET users listing.
router.get('/grade', function(req, res){
        res.render('grades');
});

//GET login page
router.get('/login', function(req, res){
        temp = req.session.msg ? req.session.msg : 0;
        delete req.session.msg;
        res.render('login', {token : req.csrfToken(), msg : temp});
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
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('details', {token : req.csrfToken(), msg : temp});
});

// GET grade page
router.get('/grade', function(req, res) {
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('grade', {token : req.csrfToken(), msg : temp});
});

// GET prediction page
router.get('/predict', function(req, res) {
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('predict', {token : req.csrfToken(), msg : temp});
});

// GET details page
router.get('/home', function(req, res) {
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('home', {token : req.csrfToken(), msg : temp});
});

router.get('/reset', function(req, res){
    temp = req.session.msg ? req.session.msg : 0;
    delete req.session.msg;
    res.render('reset', {token : req.csrfToken(), msg : temp});
});

// Generic get route request handler
router.get(/\/.*/, function(req, res) {
  res.render('index');
});

module.exports = router;