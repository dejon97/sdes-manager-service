/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const router = require('./routes/');

app.use(bodyParser.json({
    extended: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 3000;

app.use('/', router);

const server = app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
}).listen(PORT, function() {
	console.log("Started listening on port " + PORT);
});

module.exports = server;
