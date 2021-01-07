var express = require('express');
var router = express.Router();

/* GET Pays avec le nom officiel qui commence par B. Cette fonction permet d'obtenir les 
pays dont leur noms officiel commence par la lettre B 
Dans collection.find est marquée la requête qu'il faut pour obtenir à ce résultat
*/
router.get('/payslist', function(req, res) {
    var db = req.db;
    var collection = db.get('pays');
    collection.find({"name.official":/^B/},{"name.official":1,"_id":false},function(e,docs){
        res.render('payslist', {
            "payslist" : docs
        });
    });
});

//GET titre des documents avec des rangs allant de 1 à 10.
router.get('/documentsrangsliste', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.rang":{$gte:1,$lte:10}},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.rang":true},function(e,docs){
        res.render('documentsrangsliste', {
            "documentsrangsliste" : docs
        });
    });
});

//GET auteur dont les titres commençent par N.
router.get('/documentsauteursnliste', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.titre_avec_lien_vers_le_catalogue":/^N/},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.auteur":true},function(e,docs){
        res.render('documentsauteursnliste', {
            "documentsauteursnliste" : docs
        });
    });
});

//GET infos vers les documents ayant un champ vide ds 'Type de document'.
router.get('/documenttypevide', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({"fields.type_de_document":{$eq:null}},{"_id":false,"fields.type_de_document":true,"fields.auteur":true,"fields.nombre_de_reservations":true,"fields.rang":true,"fields.titre_avec_lien_vers_le_catalogue":true},function(e,docs){
        res.render('documenttypevide', {
            "documenttypevide" : docs
        });
    });
});

//GET tout les types de documents
router.get('/documenttypeliste', function(req,res){
    var db = req.db;
      var collection = db.get('documents');
      collection.distinct("fields.type_de_document",function(e,docs){
          res.render('documenttypeliste', {
              "documenttypeliste" : docs
          });
      });
  });

//GET liste des documents avec le titre sans l'id mais avec le type de document
router.get('/documentsliste', function(req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({},{"_id":false,"fields.titre_avec_lien_vers_le_catalogue":true,"fields.type_de_document":true},function(e,docs){
        res.render('documentsliste', {
            "documentsliste" : docs
        });
    });
});


/* GET New User page. Méthode du tutoriel
A ignorer pour le projet de la médiathèque*/
router.get('/newartiste', function(req, res) {
    res.render('newartiste', { title: 'Ajouter un artiste' });
});

/* POST pour ajouter des artistes a ignorer pour le projet de la médiathèque */
router.post('/addartiste', function(req, res) {

    // On attribue une variable pour notre BDD
    var db = req.db;

    // On obtient les valeurs du formulaires. On les obtient via le champ "name"
    var userNom = req.body.usernom;
    var userAnnee = req.body.useranneedebut;

    // On attribue une variable pour notre collection
    var collection = db.get('artistes');

    // On envoie à la BDD
    collection.insert({
        "nom" : userNom,
        "anneedebut" : userAnnee
    }, function (err, doc) {
        if (err) {
            // Erreur si fail
            res.send("Problème pour ajouter l'artiste.");
        }
        else {
            // Si Succes redirection vers la liste d'artiste
            res.redirect("artistelist");
        }
    });

});

module.exports = router;
