const Courses = require('../model/Course')
const mongooseHandler = require('../../util/mongoose')

class CoursesController{
    //[GET] /course/:slug
    show(req,res,next){
        Courses.findOne({slug : req.params.slug})
            .then((course) => {
                res.render('courses/show',{
                    course: mongooseHandler.mongooseToObject(course)
                })
            })
    }

    //[GET] /courses
    index(req,res,next){
        Courses.find({})
            .then(courses => {
                res.render('courses',{
                    courses: mongooseHandler.multipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    //[GET] course/create
    create(req,res,next){
         res.render('courses/create')
    }

    //[POST] courses/store
    store(req,res,next){
        var formBody = req.body
        formBody.image = req.body.videoID;
        const course = new Courses(formBody);
        course.save((err) => {
            if(err) {console.log('LỖI R')}
            else{
                res.redirect('/courses')
            }
        });
    }

    //[GET] courses/:id/edit
    courseEdit(req,res,next){
        Courses.findById(req.params.id)
            .then(course => {
                res.render('courses/edit',{
                    course: mongooseHandler.mongooseToObject(course)
                })
            })
            .catch(next)
    }

    //[PUT] courses/:id
    update(req,res,next){
        var formBody = req.body
        Courses.findById(req.params.id,(err,doc) => {
            if (err) {
                res.send('ERROR!!!')
            } else {
                doc.name = formBody.name;
                doc.description = formBody.description;
                doc.videoID = formBody.videoID;
                doc.image = formBody.videoID;
                doc.save((err,doc) => {
                    if(!err) res.redirect('/courses')
                })
            }
        })
    }

    //[DELETE] courses/:id
    delete(req,res,next){
        Courses.deleteOne({ _id : req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
        
    }
}

module.exports = new CoursesController