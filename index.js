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
const calculateEur = require('./calculate-eur')
const zhcnjson = require('./locales/zh-cn.json');
const zhhkjson = require('./locales/zh-hk.json');
const enjson = require('./locales/en.json');
const eneurjson = require('./locales/en-eur.json');
const dejson = require('./locales/de.json');
const frjson = require('./locales/fr.json');
const esjson = require('./locales/es.json');
const itjson = require('./locales/it.json');
const nljson = require('./locales/nl.json');
const ptjson = require('./locales/pt.json');
const pljson = require('./locales/pl.json');

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
        // console.log("get10yr: ", pydata)
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

// EUR routes
app.get('/en-eur', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let eneurdata = Object.assign(eneurjson, yeardata)
        res.render('sats', eneurdata)
    })
});

app.get('/de', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let dedata = Object.assign(dejson, yeardata)
        res.render('sats', dedata)
    })
});

app.get('/fr', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let frdata = Object.assign(frjson, yeardata)
        res.render('sats', frdata)
    })
});

app.get('/es', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let esdata = Object.assign(esjson, yeardata)
        res.render('sats', esdata)
    })
});

app.get('/it', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let itdata = Object.assign(itjson, yeardata)
        res.render('sats', itdata)
    })
});

app.get('/nl', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let nldata = Object.assign(nljson, yeardata)
        res.render('sats', nldata)
    })
});

app.get('/pt', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let ptdata = Object.assign(ptjson, yeardata)
        res.render('sats', ptdata)
    })
});

app.get('/pl', function(req, res) {
    calculateEur.get10yr().then(pydata => {
        const yeardata = { 'yeardata': pydata }
        let pldata = Object.assign(pljson, yeardata)
        res.render('sats', pldata)
    })
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));