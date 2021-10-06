/**
 * Module dependencies.
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

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    extname: 'hbs',
}));

app.use(express.static('public'))

// log requests
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));


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