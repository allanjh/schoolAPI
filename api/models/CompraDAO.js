function CompraDAO(connection){
    this._connection = connection;
}

CompraDAO.prototype.getCompraPorId = function(idConsumidor, callback){

    query = "SELECT * FROM buy.compra WHERE buy.compra.consumidor_idconsumidor = ? ";

    this._connection.query(query, idConsumidor, callback);
}

CompraDAO.prototype.getProdutosCompraPorId = function(idCompra, callback){

    query = "SELECT * FROM buy.item_compra WHERE buy.item_compra.compra_idcompra = ? ";

    this._connection.query(query, idCompra, callback);
}

CompraDAO.prototype.insertListaCompra = function(novaLista, callback){
    this._connection.query('INSERT INTO compra SET ? ', novaLista, callback);
}

CompraDAO.prototype.insertProdutoEmListaCompra = function(novoProduto, callback){
    this._connection.query('INSERT INTO item_compra SET ? ', novoProduto, callback);
}

CompraDAO.prototype.updateTotalCompra = function(idCompra, callback){

    query = "UPDATE compra " + 
            "SET total_compra = (" + 
            "SELECT SUM(item_compra.preco_produto_compra * item_compra.quantidade_produto_compra) " +
            "FROM buy.item_compra WHERE compra_idcompra = ? ) " +
            "WHERE idcompra = ? ";

    this._connection.query(query, idCompra, callback);
}

CompraDAO.prototype.updateSupermercadoCompra = function(novoSupermercadoCompra, callback){
    this._connection.query('UPDATE compra SET ? WHERE idcompra = ? ', novoSupermercadoCompra, callback);
}

CompraDAO.prototype.deleteProdutosCompra = function(idCompra, callback){
    this._connection.query('DELETE FROM item_compra WHERE compra_idcompra =  ? ', idCompra, callback);
}

CompraDAO.prototype.deleteCompra = function(idCompra, callback){
    this._connection.query('DELETE FROM compra WHERE idcompra =  ? ', idCompra, callback);
}

module.exports = function(){
	return CompraDAO;
}