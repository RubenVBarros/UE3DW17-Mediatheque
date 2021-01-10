var express = require('express');
var router = express.Router();

//GET liste des documents avec le titre sans l'id mais avec le type de document
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.type_de_document":true},function(e,docs){
        res.render('documentsliste', {
            "documentsliste" : docs
        });
    });
});

//GET titre des documents avec des rangs allant de 1 à 10.
router.get('/rangs', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.rang":{$gte:1,$lte:10}},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.rang":true},function(e,docs){
        res.render('documentsrangsliste', {
            "documentsrangsliste" : docs
        });
    });
});

//GET tout les types de documents
router.get('/types', function(req,res){
    var db = req.db;
      var collection = db.get('documents');
      collection.distinct("fields.type_de_document",function(e,docs){
          res.render('documenttypeliste', {
              "documenttypeliste" : docs
          });
      });
  });

//GET infos vers les documents ayant un champ vide ds 'Type de document'.
router.get('/sans_type', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.type_de_document":{$eq:null}},{"_id":false,"fields.type_de_document":true,"fields.auteur":true,"fields.nombre_de_reservations":true,"fields.rang":true,"fields.titre_avec_lien_vers_le_catalogue":true},function(e,docs){
        res.render('documenttypevide', {
            "documenttypevide" : docs
        });
    });
});


//GET auteur dont les titres commençent par N.
router.get('/auteurs_n', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.titre_avec_lien_vers_le_catalogue":/^N/},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.auteur":true},function(e,docs){
        res.render('documentsauteursnliste', {
            "documentsauteursnliste" : docs
        });
    });
});
module.exports = router;
