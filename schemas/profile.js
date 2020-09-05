const mongoose = require('mongoose');
const {Schema} = mongoose;

const profileSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    security_question_one: {type: String},
    security_answer_one: {type: String},
    security_question_two: {type: String},
    security_answer_two: {type: String},
    rol: {type: String, default: 'USER'}
});

const model = mongoose.model('profile', profileSchema);

module.exports = model;
