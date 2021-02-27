var express = require('express');
var router = express.Router();
const {app} = require('../app');
// const mongo = app.get('mongo_client');
//
//

router.get('/nowcasts', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const nowcasts = mongo.events.collection("nowcasts");
    var date = new Date();
    date.setDate(date.getDate() - 1);
    nowcasts.find({"properties.forecast.issue_time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"type": "FeatureCollection", "features": docs});
        // res.send(JSON.stringify({"type": "FeatureCollection", "features": docs}));
    })
});

router.get('/earthquakes', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const earthquakes = mongo.events.collection("disasters");
    var date = new Date();
    date.setDate(date.getDate() - 3);
    earthquakes.find({"properties.time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"type": "FeatureCollection", "features": docs});
        // res.send(JSON.stringify({"type": "FeatureCollection", "features": docs}));
    })
});
//

module.exports = router;