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

router.patch('/:id/:action', function(req,res){
    let id = req.params.id;
    let action = req.params.action;
    let db = req.db;
    switch(action){
        case "emprunter":
            docs = db.get("documents");
            docs.update({"_id":id},{"$set":{"emprunt":true}},function(error, result){
                if(error){
                    console.error(error.message);
                }
                res.send('ok'); 

            });
            break;
        case "rendre":
            docs = db.get("documents");
            docs.update({"_id":id},{"$unset":{"emprunt":""}},function(){
                res.send('ok');
            });
            break;
        default:
            res.send("Action incorrecte.");
    }
});

module.exports = router;
