// const Course = require('../model/Course')
// const mongooseHandler = require('../../util/mongoose')

const jwt = require('jsonwebtoken')

class SiteController {
    //[GET] /
    index(req, res, next) {
        console.log(req.user);
        res.render('home',{
            user: req.user
        })
    }
}

module.exports = new SiteController();
