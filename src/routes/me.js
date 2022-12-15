const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const meController = require('../app/controllers/MeController')

const Accounts = require('../app/model/Account')

const getCookies = async (req, res, next) => {
    try {
        var result = jwt.verify(req.cookies.token, 'password')
        console.log(result);
        let acc = await Accounts.findOne({ _id: result._id });
        req.user = acc
        next()
    } catch (error) {
        console.log(error);
        next()
    }
}

router.get('/stored/post', getCookies, meController.storeCourses)

module.exports = router