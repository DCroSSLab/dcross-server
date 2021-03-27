var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/:id', function(req, res, next) {
  const userId = req.params.id
  const mongo = req.app.get('mongo_client');
  const users = mongo.users.collection("reporters");
  users.find({"_id": ObjectID(userId)}).toArray(function (err, docs) {
      if (err) {console.log(err)}
      res.json({"user": docs[0]})
  });
});

module.exports = router;
