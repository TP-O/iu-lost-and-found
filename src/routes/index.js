
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses')
const meRouter = require('./me')
const loginRouter = require('./login')
const registerRouter = require('./register')
const logoutRouter = require('./logout')

function router(app) {
    
    app.use('/post',coursesRouter);

    app.use('/me',meRouter)
    
    app.use('/login', loginRouter)

    app.use('/register', registerRouter)

    app.use('/logout',logoutRouter)
    
    app.use('/', siteRouter);
}

module.exports = router;
