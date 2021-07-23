/**
 * Module dependencies.
 * source origin: https://github.com/expressjs/express/tree/master/examples/static-files
 */

var express = require("express");
var logger = require('morgan');
var path = require('path');
var app = express();
const product = require("./api/product");

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

app.use(express.json({ extended: false }));
app.use("/api/product", product);

app.listen(3000);
console.log('listening on port 3000');
console.log('try:');
console.log('  GET /index.html');