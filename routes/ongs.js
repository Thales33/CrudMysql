var express = require('express');
var router = express.Router();


/*GET Home DE ONGS */
router.get('/', function(req, res, next) {
	res.render('ongs/homeOngs', {
		title: 'ONG\'S'
	})
});

/* Get Lista de ongs no banco */ 
router.get('/onglist', function(req, res, next) {
 var db = req.db;
 db.query("SELECT * FROM `multiform`.`ongs`;",function( err, rows, fields) {
				if (err){
					console.log(err);
				}
	res.render('ongs/onglist', {
		title: 'ONG\'S',
		onglist: rows
	})
 });
});



		
	
/* Nova ong form*/

router.get('/add',function(req,res){
	res.render('ongs/novaong', {title: 'Cadastrar Ong'});
});

/*Add ONG */

router.post('/add',function(req, res){
	
	var db = req.db;

  // Get valores do formulário
    var ongNome = req.body.nome;
    var ongEmail = req.body.email;
    var ongTelefone = req.body.telefone;
    var ongBairro = req.body.bairro;

    db.query("INSERT INTO multiform.ongs (`nome`,`email`,`telefone`,`bairro`) VALUES ('"+ongNome+"','"+ongEmail+"','"+ongTelefone+"','"+ongBairro+"')",function(err,rows){
    	if(err){
    		console.log(err);
    		res.send('Erro ao adicionar Ong ao Banco de Dados')
    	} else{
    		res.location('/ongs/onglist');
   	        res.redirect('/ongs/onglist');
   	        console.log('Adicionado ao Banco de Dados');
    	}
    });
   });



		

module.exports = router;