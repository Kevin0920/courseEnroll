var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, require: true},
  }, {timestamps: true});
  
var User = mongoose.model('User', UserSchema);

var CourseSchema = new mongoose.Schema({
    courseName: {type: String, required: true},
    description: {type: String, required: true},
    date: Date
}, {timestamps: true});

var Course = mongoose.model('Course', CourseSchema);