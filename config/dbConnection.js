// importa o módulo do MySQL
var mysql = require('mysql');

//Seta as variáveis de conexão
var connMySQL = function(){
	// retorna uma conexão criada
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '1234',
		database : 'buy'
	});
}

//exporta uma conexão criada
module.exports = function () {
	return connMySQL;
}