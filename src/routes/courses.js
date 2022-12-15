const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

//Parse body when use POST method
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const coursesController = require('../app/controllers/CoursesController')

const Accounts = require('../app/model/Account')

const getCookies = async (req, res, next) => {
    try {
        var result = jwt.verify(req.cookies.token, 'password')
        console.log(result);
        let acc = await Accounts.findOne({ _id: result._id });
        console.log(acc);
        req.user = acc
        next()
    } catch (error) {
        res.write(`<h1>You have to login</h1>
        <a href="/">Back to home page</a>
        `)
    }
}

router.post('/store', getCookies, urlencodedParser , coursesController.store)

router.get('/create', getCookies, coursesController.create)

router.put('/:id' , getCookies, urlencodedParser , coursesController.update)

router.delete('/:id', getCookies, coursesController.delete)

router.get('/:id/edit', getCookies, coursesController.courseEdit)

router.get('/:slug', getCookies, coursesController.show)

router.get('/', getCookies, coursesController.index)

module.exports = router;
