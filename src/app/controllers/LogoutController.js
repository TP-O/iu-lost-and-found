class LogoutController{

    index(req,res,next){
        res.cookie('token','')
        res.redirect('/')
    }
}

module.exports = new LogoutController