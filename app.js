// importa as configurações do servidor feitas no arquivo server.js
var app = require('./config/server');


// Coloca o servidor online e indica a porta para que ele escute.
app.listen(3000, function(){
	console.log('Servidor ON');
});