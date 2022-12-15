const Courses = require('../model/Course')
const mongooseHandler = require('../../util/mongoose')
const jwt = require('jsonwebtoken')

class MeController {

    //[GET] /me/stored/courses
    storeCourses(req, res, next) {
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'password')
            if (ketqua) {
                Courses.find({})
                    .then(courses => {
                        res.render('me/stored-courses', {
                            courses: mongooseHandler.multipleMongooseToObject(courses),
                            user: req.user
                        })
                    })
                    .catch(next)
            }

        } catch (error) {
            res.send('You have to login')
        }

    }
}

module.exports = new MeController

/**
 * ,(res,req,next) => {
    try {
        var token = req.cookies.token
        var ketqua = jwt.verify(token,'password')
        if(ketqua) next()

    } catch (error) {
        res.send('You have to login')
    }
},
 */