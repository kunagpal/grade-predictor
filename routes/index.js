var bcrypt;
var path = require('path');
var crypto = require('crypto');
var router = require('express').Router();
var mongo = require('mongodb').MongoClient;
var uri = process.env.MONGO || 'mongodb://127.0.0.1:27017/iwp';

try {
    bcrypt = require('bcrypt');
}
catch(err){
    bcrypt = require('bcryptjs');
}
try{
    var key = require(path.join(__dirname, '..', 'key')).key;
}
catch(err){
    console.log(err.message);
    key = 0;
}
var email = require('nodemailer').createTransport({
    service: 'Gmail',
    auth: {
        user: 'gradepredictor@gmail.com',
        pass: process.env.PASSWORD || key
    }
});
/* GET home page. */
router.get('/', function(req, res)
{
    mongo.connect(uri, function(err, db){
        if(err)
        {
            console.log(err.message);
            res.render('index', {msg : 'An unexpected error has occured.'});
        }
        else
        {
            var op = {dob : 0, hash : 0, email : 0, token : 0, expires : 0, form : 0, num : 0};
            db.collection('users').findOne({_id : req.signedCookies.name}, op, function(err, doc){
                db.close();
                if(err)
                {
                    console.log(err.message);
                }
                else
                {
                    console.log(doc);
                    res.render('index', {name : req.signedCookies.name});
                }
            });
        }
    });
});
// GET reset token page
router.get('/reset/:token', function(req, res) {
    mongo.connect(uri, function(err, db) {
        if(err)
        {
            console.log(err.message);
            res.render('forgot', {token : req.csrfToken()});
        }
        else
        {
            db.collection('users').findOne({ token: req.params.token, expire: { $gt: Date.now() } }, function(err, doc) {
                db.close();
                if(err)
                {
                    console.log(err.message);
                }
                else if (!doc)
                {
                    console.log('No matches found !');
                    req.session.msg = 'No matches found!';
                    res.redirect('/forgot');
                }
                else
                {
                    res.render('reset', {token : req.csrfToken(), msg : req.session.msg ? req.session.msg : 0});
                    delete req.session.msg;
                    console.log('Found!');
                }
            });
        }
    });
});
// POST login page
router.post('/login', function(req, res) {
    if (req.signedCookies.name)
    {
        res.clearCookie('name', { });
    }
    mongo.connect(uri, function(err, db){
        if(err)
        {
            console.log(err.message);
            res.redirect('/login');
        }
        else
        {
            db.collection('users').findOne({_id : req.body.id}, function(err, doc){
                db.close();
                if(err)
                {
                    console.log(err.message);
                }
                else if(!doc)
                {
                    res.render('login', {token : req.csrfToken(), msg : 'Incorrect credentials!'});
                }
                else
                {
                    if (bcrypt.compareSync(req.body.password, doc.hash))
                    {
                        res.cookie('name', req.body.id, {maxAge: 86400000, signed : true});
                        res.redirect('/home');
                    }
                    else
                    {
                        req.session.msg = 'Incorrect credentials!';
                        res.redirect('/login');
                    }
                }
            });
        }
    });
});
// POST register page
router.post('/signup', function(req, res) {
    if(req.body.password === req.body.confirm)
    {
        mongo.connect(uri, function(err, db){
            if(err)
            {
                console.log(err.message);
            }
            else
            {
                db.collection('users').count(function(err, num){
                    if(err)
                    {
                        console.log(err.message);
                    }
                    else
                    {
                        console.log(num);
                        db.close(function(){
                            var user = {
                                _id : req.body.id,
                                dob : req.body.dob,
                                num : parseInt(num) + 1,
                                hash : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                                email : req.body.email
                            };
                            mongo.connect(uri, function(err, db){
                                if(err)
                                {
                                    console.log(err.message);
                                }
                                else
                                {
                                    db.collection('users').insertOne(user, function(err, docs){
                                        db.close();
                                        if(err)
                                        {
                                            console.log(err.message);
                                            res.render('signup', {msg: 'That username is already taken, please choose a different one', token : req.csrfToken()});
                                        }
                                        else
                                        {
                                            res.cookie('name', docs[0]._id, {maxAge: 86400000, signed: true});
                                            res.redirect('/');
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    }
    else
    {
        res.render('signup', {token : req.csrfToken(), msg : 'Passwords do not match!'});
    }
});
// POST forgot password page
router.post('/forgot', function(req, res) {
    mongo.connect(uri, function(err, db){
        if(err)
        {
            console.log(err.message);
            res.render('index');
        }
        else
        {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                var options = {
                    from: 'gradepredictor@gmail.com',
                    to : req.body.email,
                    subject: 'Time to get back in the game',
                    text: 'Hey there, ' + req.body.id + '\n' + 'A little birdie told us that you were having troubles with your password.\n'
                    + 'That really hurts us, so please click on http://' + req.headers.host + '/reset/' + token + ' within sixty minutes of seeing this message in order to' +
                    ' reset your password.\nWe would love to have you back as a user.\n In the event that this password reset was not requested by you, please ignore this' +
                    ' message and your password shall remain intact.'
                };
                db.collection('users').findOneAndUpdate({email : req.body.email, _id : req.body.id}, {$set:{token : token, expire : Date.now() + 3600000}}, {}, function(err, doc){
                    db.close();
                    if(err)
                    {
                        console.log(err.message);
                    }
                    else if(!doc)
                    {
                        console.log('Oh No !');
                    }
                    else
                    {
                        email.sendMail(options, function(err) {
                            if(err)
                            {
                                console.log(err.message);
                            }
                            else
                            {
                                req.session.msg = 'An email has been sent to ' + options.to + ' with further instructions.';
                                res.redirect('/login');
                            }
                        });
                    }
                });
            });
        }
    });
});
// POST reset token page
router.post('/reset/:token', function(req, res) {
    if(req.body.password === req.body.confirm)
    {
        mongo.connect(uri, function(err, db){
            if(err)
            {
                console.log(err.message);
                res.render('index', {stats : []});
            }
            else
            {
                var query = {token : req.params.token, expire : {$gt: Date.now()}},
                    op = {$set : {hash : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))}, $unset : {token : '', expire : ''}};
                db.collection('users').findOneAndUpdate(query, op, {}, function(err, doc) {
                    db.close();
                    if(err)
                    {
                        console.log(err.message);
                    }
                    else if(!doc)
                    {
                        console.log('No matches!');
                        req.session.msg = 'An unexpected error has occurred. Please retry.';
                        res.redirect('/forgot');
                    }
                    else
                    {
                        var options = {
                            from: 'gradepredictor@gmail.com',
                            to : doc.email,
                            subject : 'Password change successful !',
                            text : 'Hey there, ' + doc._id + '.\nWe\'re just writing in to let you know that the recent password change for your account was successful.'
                        };
                        email.sendMail(options, function(err) {
                            if(err)
                            {
                                console.log(err.message);
                            }
                            else
                            {
                                console.log('Updated successfully!');
                                req.session.msg = 'Updated successfully!';
                                res.redirect('/login');
                            }
                        });
                    }
                });
            }
        });
    }
    else
    {
        console.log('Passwords do not match !');
        req.session.msg = 'Passwords do not match!';
        res.redirect('/reset');
    }
});

module.exports = router;