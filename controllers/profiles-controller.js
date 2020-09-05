const Profile = require('../schemas/profile');

const mongoosePaginate = require('mongoose-pagination');

const bcrypt = require('bcrypt');
const saltRounds = 15;

// Create profile
// Route: POST 'register/'
const createProfile = function(req,res){

    // Try this:
    try{
        // Define variables
        const {username, password, questionSecurity1, answerSecurity1, questionSecurity2, answerSecurity2,rol} = req.body;

        // Hash password
        bcrypt.hash(password, saltRounds)
            .then(function(hashedPassword) {
                return Profile.create({
                    username: username,
                    password: hashedPassword,
                    security_question_one: questionSecurity1,
                    security_answer_one: answerSecurity1,
                    security_question_two: questionSecurity2,
                    security_answer_two: answerSecurity2,
                    rol: rol
                });
            })
            .then(function() {
                res.send({
                    status: 'OK',
                    message: 'User Created'
                });
            })
            .catch(function(error){
                res.send({
                    status: 'ERROR',
                    message: error.message
                })
            });

    }catch (e) {
        // In case it was an error
        throw e;
    }
};

// Delete profile
// Route: DELETE 'login/:id'
const deleteProfile = (req, res) =>{
    // Declare Variables
    const userId = req.params.id;

    // Find profile and removed
    Profile.findByIdAndRemove(userId, function (err, userRemoved) {
        if(err){
            res.send({
                status: 'ERROR',
                message: err.message
            })
        }else{
            if(!userRemoved){
                return res.send({
                    status: 'NOT_FOUND',
                    message: 'User not found'
                })
            }else{
                res.send({
                    status: 'OK',
                    message: userRemoved
                })
            }
        }
    } );

};

// Get profile
// Route: GET 'login/:username'
const getProfile = (req, res) =>{
    // Declare variables
    const username = req.params.username;

    // Find profile by id
    Profile.findOne({username: username}, function (err, userFound) {
        if(err){
            res.send({
                status: 'ERROR',
                message: err.message
            });
        }else{
            if(!userFound){
                return res.send({
                    status: 'ERROR',
                    message: 'User not found'
                });
            }else{
                res.send({
                    status: 'OK',
                    message: userFound
                });
            }
        }
    });
};

// Update profile
// Route: POST 'login/:id'
const updateProfile = (req, res) =>{
    const userId = req.params.id;
    const update = req.body;

    Profile.findByIdAndUpdate(userId, update, (err, userUpdated)=> {
        if(err){
            return res.send({
                status: 'ERROR',
                message: err.message
            });
        }else {
            if (!userUpdated) {
                return res.send({
                    status: 'ERROR',
                    message: 'User not found'
                });
            } else {
                res.send({
                    status: 'OK',
                    message: userUpdated
                });
            }
        }
    });
};

// Pagination characters
// Route: GET 'login/paginate/:page'
const getProfiles = (req, res) =>{
    const page = req.params.page;
    const itemsPerPage = 6;

    Profile.find().paginate(page, itemsPerPage, (err, users, total) => {
        if(err){
            return res.send({
                status: 'ERROR',
                message: err.message
            });
        } else {
            if(!users){
                return res.send({
                    status: 'ERROR',
                    message: 'There isn\'t any users'
                });
            }else{
                return res.send({
                    pages: total,
                    notebooks: users
                });
            }
        }
    });
};

module.exports = {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
    getProfiles,
};
