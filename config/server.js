// Realiza os imports dos módulos instalados via NPM
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Inicializa o módulo Express dentro da variável app
var app = express();

// Inclui a pasta de arquivos estáticos na variável app
app.use(express.static('./app/public'));
// Inclui o módulo body-parser na variável app
app.use(bodyParser.urlencoded({extended: true}));
// Inclui o módulo express-validator na variável app
app.use(expressValidator());

/*
    Inicializa o módulo Consign que importa automaticamente
    os arquivos incluidos nas pastas incluídas nele.
    As importações são incluídas na variavel app.
*/
consign()
	.include('api/routes')
	.then('api/helpers')
	.then('config/dbConnection.js')
	.then('api/models')
	.then('api/controllers')
	.into(app);

// Exporta a variável app
module.exports = app;