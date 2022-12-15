const Courses = require('../model/Course')
const mongooseHandler = require('../../util/mongoose')

class CoursesController {
    //[GET] /course/:slug
    show(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseHandler.mongooseToObject(course),
                    user: req.user,
                })
            })
    }

    //[GET] /courses
    index(req, res, next) {
        Courses.find({})
            .then(courses => {
                res.render('courses', {
                    courses: mongooseHandler.multipleMongooseToObject(courses),
                    user: req.user,
                })
            })
            .catch(next)
    }

    //[GET] course/create
    create(req, res, next) {
        res.render('courses/create', {
            user: req.user,
        })
    }

    //[POST] courses/store
    store(req, res, next) {
        var formBody = req.body
        formBody.image = `${req.body.videoID}`
        const course = new Courses(formBody);
        course.save((err) => {
            if (err) { console.log('LỖI R') }
            else {
                res.redirect('/post')
            }
        });
    }

    //[GET] courses/:id/edit
    courseEdit(req, res, next) {
        Courses.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseHandler.mongooseToObject(course),
                    user: req.user,
                })
            })
            .catch(next)
    }

    //[PUT] courses/:id
    update(req, res, next) {
        var formBody = req.body
        Courses.findById(req.params.id, (err, doc) => {
            if (err) {
                res.send('ERROR!!!')
            } else {
                doc.name = formBody.name;
                doc.description = formBody.description;
                doc.videoID = formBody.videoID;
                doc.image = `${formBody.videoID}`
                doc.save((err, doc) => {
                    if (!err) res.redirect('/post')
                })
            }
        })
    }

    //[DELETE] courses/:id
    delete(req, res, next) {
        Courses.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/me/stored/post')
            })
            .catch(next)
    }
}

module.exports = new CoursesController