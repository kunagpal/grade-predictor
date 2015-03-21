var express = require('express');
var router = express.Router();
var temp;
/* GET users listing. */
router.get('/grade', function(req, res){
    if(req.signedCookies.name)
    {
        res.render('grade');
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
        res.redirect('/');
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
//GET forgot page
router.get('/forgot', function(req, res){
    res.render('forgot', {token : req.csrfToken()});
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
// Generic get route request handler
router.get(/\/.*/, function(req, res) {
  res.render('index');
});

module.exports = router;
