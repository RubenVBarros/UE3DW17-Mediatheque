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
