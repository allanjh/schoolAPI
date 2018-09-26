// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar os dados de um produto a partir do id
    app.get('/api/produto/:id', function (req, res) {
        app.api.controllers.produto.getProdutoPorId(app, req, res);
    });

    //Rota para pegar os dados de um produto a partir do EAN
    app.get('/api/produto/ean/:ean', function (req, res) {
        app.api.controllers.produto.getProdutoPorEAN(app, req, res);
    });

    //Rota para pegar uma lista de produtos de uma determinada 
    //categoria a partir do id da categoria
    app.get('/api/produto/categoria/:id', function (req, res) {
        app.api.controllers.produto.getProdutosPorCategoria(app, req, res);
    });

    //Rota para pegar uma lista de produtos de uma determinada 
    //marca a partir do id da marca
    app.get('/api/produto/marca/:id', function (req, res) {
        app.api.controllers.produto.getProdutosPorMarca(app, req, res);
    });

    //Rota para incluir um novo produto
    app.post('/api/produto', function (req, res) {
        app.api.controllers.produto.insertProduto(app, req, res);
    });

    //Rota para atualizar o cadastro de um produto pelo id
    app.put('/api/produto/:id', function (req, res) {
        app.api.controllers.produto.updateProduto(app, req, res);
    });

    //Rota para deletar o registro de um produto pelo id
    app.delete('/api/produto/:id', function (req, res) {
        app.api.controllers.produto.deleteProduto(app, req, res);
    });

    //Rota para recuperar uma imagem pelo nome dela
    app.delete('/api/imagem/:nomeImagem', function (req, res) {
        app.api.controllers.produto.getImage(app, req, res);
    });
}