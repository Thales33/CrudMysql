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
    		
   	        res.redirect('ongs/onglist');
   	        console.log('Adicionado ao Banco de Dados');
    	}
    });
   });


/*  Get atributos para Editar Ong. */
router.get('/editar/:id', function(req, res) {
    var db = req.db;
    var id = req.params.id;

    db.query("SELECT * FROM multiform.ongs WHERE id = ?",[id],function(err, rows,field){
               if (err) {
               	console.log(err);
               	               }
               
            res.render('ongs/editarOng', {
            onglist : rows , title: 'Editar ONG'
        });
    });
    
});

/* Editar Ong */

router.post('/editarOng',function(req,res){
	var db = req.db;

	// Get valores do formulário
	var id = req.body.id;
	var set = {
         nome : req.body.nome,
        email : req.body.email,
     telefone : req.body.telefone,
       bairro : req.body.bairro
}
  db.query("UPDATE multiform.ongs SET ? WHERE id = ?",[set,id],function(err){

    	if(err){
    		console.log(err);
    		res.send('Erro ao Editar Ong no Banco de Dados')
    	} else{
    		
   	        res.redirect('/ongs/onglist');
   	        console.log('Editado com sucesso!');
    	}
    });
});

/* Deletar Ong */

router.get('/delete/:id',function(req,res){
	var db = req.db;

	// Get valores do formulário
	var id = req.params.id;
	
  db.query("DELETE FROM multiform.ongs WHERE id = ?",[id],function(err){

    	if(err){
    		console.log(err);
    		res.send('Erro ao Deletar Ong do Banco de Dados')
    	} else{
    		
   	        res.redirect('/ongs/onglist');
   	        console.log('Deletado com sucesso!');
    	}
    });
});




		

module.exports = router;