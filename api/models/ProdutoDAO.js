function ProdutoDAO(connection){
    this._connection = connection;
}

ProdutoDAO.prototype.getProdutoPorId = function(idProduto, callback){

    var query = 'SELECT * FROM buy.produto ' +
                'LEFT JOIN buy.precos_itens_compra ON buy.produto.idproduto = buy.precos_itens_compra.produto_idproduto ' +
                'WHERE buy.produto.idproduto = ? ' +
                'ORDER BY data_compra DESC ' +
                'LIMIT 1';

    this._connection.query(query, idProduto, callback);
}

ProdutoDAO.prototype.getProdutoPorEAN = function(eanProduto, callback){

    var query = 'SELECT * FROM buy.produto ' +
                'LEFT JOIN buy.precos_itens_compra ON buy.produto.idproduto = buy.precos_itens_compra.produto_idproduto ' +
                'WHERE buy.produto.ean_produto = ? ' +
                'ORDER BY data_compra DESC ' +
                'LIMIT 1';

    this._connection.query(query, eanProduto, callback);
}

ProdutoDAO.prototype.getProdutosPorCategoria = function(categoriaProduto, callback){
    this._connection.query('SELECT * FROM produto WHERE categoria_produto_idcategoria_produto = ? ', categoriaProduto, callback);
}

ProdutoDAO.prototype.getProdutosPorMarca = function(marcaProduto, callback){
    this._connection.query('SELECT * FROM produto WHERE marca_produto_idmarca_produto = ? ', marcaProduto, callback);
}

ProdutoDAO.prototype.insertProduto = function(novoProduto, callback){
    this._connection.query('INSERT INTO produto SET ? ', novoProduto, callback);
}

ProdutoDAO.prototype.updateProduto = function(produto, callback){
    this._connection.query('UPDATE produto SET ? WHERE idproduto = ? ', produto, callback);
}

ProdutoDAO.prototype.deleteProduto = function(idProduto, callback){
    this._connection.query('DELETE FROM produto WHERE idproduto =  ? ', idProduto, callback);
}

module.exports = function(){
	return ProdutoDAO;
}