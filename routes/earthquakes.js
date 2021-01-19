var express = require('express');
var router = express.Router();
const {app} = require('../app');
// const mongo = app.get('mongo_client');
//
//
router.get('/', function(req, res, next) {
    const mongo = req.app.get('mongo_client');
    const earthquakes = mongo.events.collection("disasters");
    var date = new Date();
    date.setDate(date.getDate() - 1);
    earthquakes.find({}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.send(JSON.stringify({"earthquakes": {"type": "FeatureCollection", "features": docs}}));
    })
});
//
module.exports = router;