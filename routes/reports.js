/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		reports.js
* Description:      Router for the /reports route
* Endpoints:        /twitter, /telegram
*
*/


var express = require('express');
var router = express.Router();

router.get('/telegram', function (req, res) {
    const mongo = req.app.get('mongo_client');
    const telegramReports = mongo.reports.collection("telegram");
    const reporters = mongo.users.collection("reporters");
    var date = new Date();
    date.setDate(date.getDate() - 3);
    telegramReports.find({"properties.time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"reports": docs});
    })
})

router.get('/twitter', function (req, res) {
    const mongo = req.app.get('mongo_client');
    const twitterReports = mongo.reports.collection("twitter");
    var date = new Date();
    date.setDate(date.getDate() - 3);
    twitterReports.find({"properties.time": {$gte: date}}).toArray(function (err, docs) {
        if (err) {console.log(err)}
        res.json({"reports": docs});
    })
})

module.exports = router;