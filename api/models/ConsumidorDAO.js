function ConsumidorDAO(connection){
    this._connection = connection;
}

ConsumidorDAO.prototype.getConsumidores = function(callback){
    this._connection.query('SELECT * FROM consumidor', callback);
}

ConsumidorDAO.prototype.getConsumidor = function(idConsumidor, callback){
    this._connection.query('SELECT * FROM consumidor WHERE idconsumidor = ? ', idConsumidor, callback);
}

ConsumidorDAO.prototype.updateConsumidor = function(consumidor, callback){
    this._connection.query('UPDATE consumidor SET ? WHERE idconsumidor = ? ', consumidor, callback);
}

ConsumidorDAO.prototype.insereLocalizacaoConsumidor = function(localizacaoConsumidor, callback){
    this._connection.query('INSERT INTO localizacao SET ? ', localizacaoConsumidor, callback);
}

ConsumidorDAO.prototype.insertConsumidor = function(novoConsumidor, callback){
    this._connection.query('INSERT INTO consumidor SET ? ', novoConsumidor, callback);
}

ConsumidorDAO.prototype.deleteConsumidor = function(idConsumidor, callback){
    this._connection.query('DELETE FROM consumidor WHERE idconsumidor =  ? ', idConsumidor, callback);
}

module.exports = function(){
	return ConsumidorDAO;
}