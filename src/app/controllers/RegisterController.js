const Accounts = require('../model/Account');

class RegisterController {

    //[GET] :/
    index(req, res, next) {
        res.render('register', {
            user: req.user
        })
    }

    //[POST] register/store
    store(req, res, next) {
        var formBody = req.body
        const account = new Accounts(formBody);
        account.save((err) => {
            if (err) { console.log('LỖI R') }
            else {
                res.redirect('/')
            }
        });
    }
}

module.exports = new RegisterController