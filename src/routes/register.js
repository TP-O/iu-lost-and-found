const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

//Parse body when use POST method
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

const registerController = require('../app/controllers/RegisterController')

router.get('/', getCookies, registerController.index)

router.post('/store', getCookies, urlencodedParser, registerController.store)

module.exports = router;