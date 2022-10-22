// const Course = require('../model/Course')
// const mongooseHandler = require('../../util/mongoose')

class SiteController {
    //[GET] /
    index(req, res, next) {
        res.render('home')
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
