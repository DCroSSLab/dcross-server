/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		index.js
* Description:      Default Express index page
*
*/


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
