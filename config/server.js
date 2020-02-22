console.log('server');
// importar modulos necessarios
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// iniciar objeto express
var app = express();

// setar variaveis para utilizar as views no express
app.set('view engine' , 'ejs') ;
app.set('views' , './app/views');

// configuracao dos middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

// configuracao do consign para carregamento automatico das rotas, models e controllers
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app ;