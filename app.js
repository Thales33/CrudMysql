var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var home = require('./routes/index');
var users = require('./routes/users');
var ongs = require('./routes/ongs');

var app = express();

//Criando conexão com o banco de dados
var connection = mysql.createConnection({
 host       : 'localhost',
 user       : 'root',
 password   : '',
 });

//connection.connect();

var db = connection;
app.use(function(req,res,next){
    req.db = db;
    next();
});

/*


connection.query("INSERT INTO multiform.ongs (`Nome`,`email`) VALUES ('"+'thales'+"','"+'tpsthales@gmail.com'+"')");

connection.query("SELECT * FROM `multiform`.`ongs`;", function(err,rows, fields){
var i = 0 
while(i < rows.length){ 
  console.log('Resultado  e :', rows[i]);
  i++;
}
});


connection.end();*/
//Fim Banco de Dados

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/users', users);
app.use('/ongs', ongs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
