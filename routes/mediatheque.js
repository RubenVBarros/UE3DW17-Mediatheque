var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({},{},function(e,docs){
        res.render('mediatheque', {
            "documents" : docs
        });
    });
});

module.exports = router;
