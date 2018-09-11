function ProdutoDAO(connection){
    this._connection = connection;
}

ProdutoDAO.prototype.getProdutoPorId = function(idProduto, callback){
    this._connection.query('SELECT * FROM produto WHERE idproduto = ? ', idProduto, callback);
}

ProdutoDAO.prototype.getProdutoPorEAN = function(eanProduto, callback){
    this._connection.query('SELECT * FROM produto WHERE ean_produto = ? ', eanProduto, callback);
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