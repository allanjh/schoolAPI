function ConsumidorDAO(connection){
    this._connection = connection;
}

ConsumidorDAO.prototype.getConsumidores = function(callback){
    this._connection.query('SELECT * FROM consumidor', callback);
}

ConsumidorDAO.prototype.getConsumidor = function(idSupermercado, callback){
    this._connection.query('SELECT * FROM supermercado WHERE idsupermercado = ? ', idSupermercado, callback);
}

ConsumidorDAO.prototype.updateConsumidor = function(supermercado, callback){
    this._connection.query('UPDATE supermercado SET ? WHERE idsupermercado = ? ', supermercado, callback);
}

ConsumidorDAO.prototype.insertConsumidor = function(novoSupermercado, callback){
    this._connection.query('INSERT INTO supermercado SET ? ', novoSupermercado, callback);
}

ConsumidorDAO.prototype.deleteConsumidor = function(idSupermercado, callback){
    this._connection.query('DELETE FROM supermercado WHERE idsupermercado =  ? ', idSupermercado, callback);
}

module.exports = function(){
	return ConsumidorDAO;
}