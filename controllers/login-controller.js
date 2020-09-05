const Profile = require ('../schemas/profile');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');

//Login post method
/**
 *
 * @param res
 * @param req - it must have a email and a password
 */
const login = function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    Profile.findOne({username: username}, (err, profile) => {
        if(err){
            res.status(500).send({
                status: "ERROR",
                message: err.message
            })
        }else{
            if(!profile){
                res.status(200).send({
                    status: "WRONG_PASSWORD",
                    message: 'Passwords doesn\'t match.'
                })
            }else{
                bcrypt.compare(password, profile.password, function(err, isMatch) {
                    if (err){
                        return res.send({
                            status: 'ERROR',
                            message: err.message
                        })
                    }
                    if(isMatch){
                        var token = jwt.sign(profile.toJSON(), process.env.JWT_KEY);
                        return res.status(200).send({
                            status: 'LOGIN',
                            data: token
                        })
                    }else{
                        res.send({
                            status: 'WRONG_PASSWORD',
                            message: 'Passwords doesn\'t match.'
                        })
                    }
                });
            }
        }
    });
};

module.exports = { login };
