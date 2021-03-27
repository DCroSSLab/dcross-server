var express = require('express');
var router = express.Router();
const {app} = require('../app');

router.get('/telegram', function (req, res) {
    const mongo = req.app.get('mongo_client');
    const telegramReports = mongo.reports.collection("telegram");
    var date = new Date();
    date.setDate(date.getDate() - 3);
    telegramReports.find({"properties.time": {$gte: date}}).toArray(function (err, docs){
        if(err) {console.error(err)}
        res.json({"reports": docs});
    })
})

module.exports = router;