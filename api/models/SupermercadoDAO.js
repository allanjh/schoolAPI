function SupermercadoDAO(connection){
    this._connection = connection;
}

SupermercadoDAO.prototype.getSupermercados = function(callback){
    this._connection.query('SELECT * FROM supermercado', callback);
}

SupermercadoDAO.prototype.getSupermercado = function(idSupermercado, callback){
    this._connection.query('SELECT * FROM supermercado WHERE idsupermercado = ? ', idSupermercado, callback);
}

SupermercadoDAO.prototype.updateSupermercado = function(supermercado, callback){
    this._connection.query('UPDATE supermercado SET ? ', supermercado, callback);
}

SupermercadoDAO.prototype.insertSupermercado = function(novoSupermercado, callback){
    this._connection.query('INSERT INTO supermercado SET ? ', novoSupermercado, callback);
}

module.exports = function(){
	return SupermercadoDAO;
}