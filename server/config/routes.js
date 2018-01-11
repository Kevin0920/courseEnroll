var mainRoutes = require('../controllers/mainControllers.js');
var path = require('path');


module.exports = function(app){

    app.post('/register', function(req, res) {
        mainRoutes.register(req, res);
      })
    
    app.post('/login', function(req, res) {
        mainRoutes.login(req, res);
    })
    
    app.post('/courses/user/:id', function (req, res) {
        mainRoutes.createCourse(req, res);
    })

    app.put('/courses/:id', (req, res, next) => {
        mainRoutes.updateCourse(req, res);
    })

    app.get('/courses', function(req, res) {
        mainRoutes.allCourses(req, res);
    })

    app.get('/course/:id', (req, res, next) => {
        mainRoutes.oneCourse(req, res);
    })

    app.delete('/courses/:id', (req, res, next) => {
        mainRoutes.destroy(req, res);
    })

	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './client/dist' });
	})

}
