function PromocaoDAO(connection){
    this._connection = connection;
}

PromocaoDAO.prototype.getPromocoes = function(callback){

    query = "SELECT * FROM promocao " +
            "INNER JOIN supermercado ON promocao.idsupermercado = supermercado.idsupermercado " +
            "INNER JOIN produto_promocao ON produto_promocao.idpromocao = promocao.idpromocao " +
            "INNER JOIN produto ON produto_promocao.idproduto = produto.idproduto " +
            "WHERE promocao.data_fim_promocao >= NOW() " +
            "ORDER BY promocao.data_fim_promocao ASC";

    this._connection.query(query, callback);
}

PromocaoDAO.prototype.getPromocao = function(idPromocao, callback){

    query = "SELECT * FROM promocao " +
            "INNER JOIN supermercado ON promocao.idsupermercado = supermercado.idsupermercado " +
            "INNER JOIN produto_promocao ON produto_promocao.idpromocao = promocao.idpromocao " +
            "INNER JOIN produto ON produto_promocao.idproduto = produto.idproduto " +
            "WHERE buy.promocao.idpromocao = ? ";

    this._connection.query(query, idPromocao, callback);
}

PromocaoDAO.prototype.getPromocoesDoSupermercado = function(idSupermercado, callback){

    query = "SELECT * FROM promocao " +
            "INNER JOIN supermercado ON promocao.idsupermercado = supermercado.idsupermercado " +
            "INNER JOIN produto_promocao ON produto_promocao.idpromocao = promocao.idpromocao " +
            "INNER JOIN produto ON produto_promocao.idproduto = produto.idproduto " +
            "WHERE buy.promocao.idsupermercado = ? " +
            "ORDER BY promocao.data_fim_promocao ASC";

    this._connection.query(query, idSupermercado, callback);
}

PromocaoDAO.prototype.insertPromocao = function(novaPromocao, callback){
    this._connection.query('INSERT INTO promocao SET ? ', novaPromocao, callback);
}

PromocaoDAO.prototype.updatePromocao = function(promocao, callback){
    this._connection.query('UPDATE promocao SET ? WHERE idpromocao = ? ', promocao, callback);
}

PromocaoDAO.prototype.deletePromocao = function(idPromocao, callback){
    this._connection.query('DELETE FROM promocao WHERE idpromocao =  ? ', idPromocao, callback);
}

module.exports = function(){
	return PromocaoDAO;
}