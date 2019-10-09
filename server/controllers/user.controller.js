const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000){
                res.status(422).send(['This E-mail address already exists.']);
            }
            else {
                return next(err);
            }
        }
    });
    console.log('Registered!');
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {}