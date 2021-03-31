/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		events.js
* Description:      Router for the /events route
* Endpoints:        /weather, /nowcasts, /earthquakes
*
*/


var express = require('express');
var router = express.Router();


router.get('/weather', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const AwsArgWeather = mongo.events.collection("aws_arg_weather");
    let date = new Date();
    date.setDate(date.getHours() - 1);
    AwsArgWeather.find({"properties.forecast.issue_time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"type": "FeatureCollection", "features": docs});
    })
});

router.get('/nowcasts', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const nowcasts = mongo.events.collection("nowcasts");
    var date = new Date();
    date.setDate(date.getDate() - 1);
    nowcasts.find({"properties.forecast.issue_time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"type": "FeatureCollection", "features": docs});
    })
});

router.get('/earthquakes', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const earthquakes = mongo.events.collection("earthquakes");
    var date = new Date();
    date.setDate(date.getDate() - 3);
    earthquakes.find({"properties.time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"type": "FeatureCollection", "features": docs});
    })
});

module.exports = router;