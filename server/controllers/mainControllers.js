var mongoose = require('mongoose');
var path = require("path");

var User = mongoose.model("User");
var Course = mongoose.model("Course");

module.exports = {

    register: function (req, res) {
        console.log("from controller register: ", req.body);
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            console.log("from controller reg user: ", user);
            if (err) {
                console.log("register error from controller ", err);
            } else {
                if (user === null) {
                    var user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    user.save(function (err, user) {
                        if (err) {
                            console.log("from controller reg: ", err);
                        } else {
                            res.json({
                                success: "success",
                                user: user
                            });
                        }
                    })
                }
            }
        })
    },

    login: function (req, res) {
        console.log(req.body);
        console.log("from controller login: ", req.body.email);
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                console.log("can't find this user email from controller", err);
            } else {
                if (user === null) {
                    res.json({
                        message: "can't find this email",
                        user: null
                    });
                } else {
                    if (user.password === req.body.password) {
                        res.json({
                            message: "success",
                            user: user
                        });
                    } else {
                        res.json({
                            message: "The password is incorrect",
                            user: null
                        });
                    }
                }
            }
        })
    },

    createCourse: function (req, res) {
        console.log("b-e controller", req.body);

        var course = new Course({
            courseName: req.body.courseName,
            description: req.body.description,
            date: req.body.date
        });

        course.save(function (err) {
            if (err) {
                res.json({
                    err: err
                });
            } else {
                res.json("success");
            }
        })
    },

    allCourses: function (req, res) {
        // console.log("b-e courses");
        Course.find({}).sort('createdAt').exec(function (err, courses) {
            if (err) {
                res.json({
                    err: err
                });
            } else {
                res.json(courses);
            }
        })
    },

    destroy: function (req, res) {
        Course.remove({
            _id: req.params.id
        }, function (err) {
            if (err) {
                res.json({
                    err: err
                });
            } else {
                res.redirect(303, '/courses');
            }
        })
    },

    oneCourse: function(req, res) {
        // console.log(req.params);
        Course.findOne({_id: req.params.id}, function (err, course) {
            if (err) {
                res.json({err:err});
            }
            else {
                res.json(course);
            }
        })
    },

    updateCourse: function (req, res) {
        Course.findOne({_id: req.params.id}, function (err, course) {
            if (err) {
                console.log(err);
                res.json({err:err});
            }
            else {
                
               course.courseName = req.body.courseName;
               course.description = req.body.description;
               course.date = req.body.date;
               course.save(function(err) {
                   if (err) {
                       res.json({err:err});
                   }
                   else {
                       console.log(course);
                       res.json("update successfully");
                   }
               })
            }
        })
    }



}