const express = require('express');
const path = require('path');
const eprhbs = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');

const router = require('./routes');
const db = require('./config/db')

const app = express();
const port = 3000;

 //override with POST having ?_method=PATCH
 app.use(methodOverride('_method'))

router(app);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'css')));

//Connect db
db.connect()

app.use(morgan('combined'))

const engine = eprhbs.engine;

//Template engine
app.engine('.hbs', engine({ 
    extname: '.hbs',
    helpers: {
        sum: (a,b) => a+b,
    }
 }));

 app.set('view engine', '.hbs');
 app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//HTTP logger