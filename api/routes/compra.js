// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar as listas de compras de um consumidor a partir do id do mesmo
    app.get('/api/compra/consumidor/:id', function (req, res) {
        app.api.controllers.compra.getCompraPorId(app, req, res);
    });

    //Rota para recuperar uma lista de compras com os produtos a partir do id da mesma
    app.get('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.getProdutosCompraPorId(app, req, res);
    });

    //Rota para incluir uma nova lista de compras
    app.post('/api/compra', function (req, res) {
        app.api.controllers.compra.insertListaCompra(app, req, res);
    });

    //Rota para atualizar o registro de uma compra pelo id
    app.put('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.updateSupermercadoCompra(app, req, res);
    });

    //Rota para deletar o registro de uma compra pelo id
    app.delete('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.deleteListaCompra(app, req, res);
    });

    //Rota para reutilizar uma lista de compras
    //Criar uma lista de compras com base em am uma já existente
    app.get('/api/compra/:id/reutiliza', function (req, res) {
        app.api.controllers.compra.reuseListaCompra(app, req, res);
    });

    //Rota para incluir um produto em uma lista de compras a partir do id da mesma
    app.post('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.insertProdutoEmListaCompra(app, req, res);
    });

    //Rota para atualizar um produto em uma lista de compras a partir do id da mesma
    //e do id do produto
    app.put('/api/compra/:idcompra/produto/:idproduto', function (req, res) {
        app.api.controllers.compra.updateProdutoEmListaCompra(app, req, res);
    });

    //Rota para deletar um produto em uma lista de compras a partir do id da mesma
    //e do id do produto
    app.delete('/api/compra/:idcompra/produto/:idproduto', function (req, res) {
        app.api.controllers.compra.deleteProdutoEmListaCompra(app, req, res);
    });



}