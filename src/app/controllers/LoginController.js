const Accounts = require('../model/Account')
const mongooseHandler = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
const passwordJWT = 'password';

class AccountsController {
    //[GET] /
    index(req, res, next) {
        res.render('login', {
            user: req.user
        })
    }

    //[POST] /login/validate
    validate(req, res, next) {
        var formBody = req.body
        Accounts.findOne({ username: formBody.username, password: formBody.password })
            .then((account) => {
                if (account) {
                    var token = jwt.sign({ _id: account._id }, passwordJWT)
                    res.cookie('token', token, { maxAge: 1000 * 60 * 15 })
                    res.redirect('/')
                } else {
                    res.write('<h1>Login failed</h1>')
                }
            })
            .catch(err => {
                res.write(`<h1>${err}</h1>`);
            })
    }
}

module.exports = new AccountsController