/**
 * Module dependencies.
 * source origin: https://github.com/expressjs/express/tree/master/examples/static-files
 */

const express = require("express");
const logger = require('morgan');
const path = require('path');
const app = express();

const handlebars = require('express-handlebars');
const port = 3000;

const calculate = require('./calculate')
const zhcnjson = require('./locales/zh-cn.json');
const zhhkjson = require('./locales/zh-hk.json');
const enjson = require('./locales/en.json');


// old default for testing
let pydataold = {
    'yeardata': [{ 'year': '1 year ago', 'sats': '1,199 ', 'percent': '-79.149' },
        { 'year': '2 years ago', 'sats': '1,582 ', 'percent': '-84.197' },
        { 'year': '3 years ago', 'sats': '1,958 ', 'percent': '-87.232' },
        { 'year': '4 years ago', 'sats': '2,984 ', 'percent': '-91.622' },
        { 'year': '5 years ago', 'sats': '21,122 ', 'percent': '-98.816' },
        { 'year': '6 years ago', 'sats': '53,632 ', 'percent': '-99.534' },
        { 'year': '7 years ago', 'sats': '40,367 ', 'percent': '-99.381' },
        { 'year': '8 years ago', 'sats': '106,515 ', 'percent': '-99.765' },
        { 'year': '9 years ago', 'sats': '1,016,962 ', 'percent': '-99.975' },
        { 'year': '10 years ago', 'sats': '2,649,533 ', 'percent': '-99.991' }
    ]
}

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    extname: 'hbs',
}));

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));


// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));
//app.use(express.json({ extended: false }));


app.get('/', function(req, res) {
    res.redirect('/en');
});

app.get('/en', function(req, res) {
    calculate.get10yr().then(pydata => {
        console.log("get10yr: ", pydata)
        const yeardata = { 'yeardata': pydata }
        let endata = Object.assign(enjson, yeardata)
        res.render('sats', endata)
    })
});

app.get('/zh-cn', function(req, res) {
    calculate.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let zhcndata = Object.assign(zhcnjson, yeardata)
        res.render('sats', zhcndata)
    })
});

app.get('/zh-hk', function(req, res) {
    calculate.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let zhhkdata = Object.assign(zhhkjson, yeardata)
        res.render('sats', zhhkdata)
    })
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));