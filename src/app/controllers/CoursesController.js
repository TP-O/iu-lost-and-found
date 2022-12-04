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
        Courses.find({
            name: {$regex : req.query.keyword || ''},
            ...(req.query.tag && req.query.tag !== 'None' ? {
                tag: req.query.tag,
            } : {})
        })
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
        req.body.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1024px-Googleplex_HQ_%28cropped%29.jpg'
        const course = new Courses(req.body);
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
        Courses.findById(req.params.id,(err,doc) => {
            if (err) {
                res.send('ERROR!!!')
            } else {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.messenger = req.body.messenger
                doc.tag = req.body.tag
                doc.image = req.body.image

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