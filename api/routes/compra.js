// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar as listas de compras de um consumidor a partir do id do mesmo
    app.get('/api/compra/consumidor/:id', function (req, res) {
        app.api.controllers.compra.getCompraPorId(app, req, res);
    });

    //Rota para pegar os produtos de uma lista de compras a partir do id da mesma
    app.get('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.getProdutosCompraPorId(app, req, res);
    });

    //Rota para incluir uma nova lista de compras
    app.post('/api/compra', function (req, res) {
        app.api.controllers.compra.insertListaCompra(app, req, res);
    });

    //Rota para incluir um produto em uma lista de compras a partir do id da mesma
    app.post('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.insertProdutoEmListaCompra(app, req, res);
    });

    //Rota para atualizar o registro de uma compra pelo id
    app.put('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.updateSupermercadoCompra(app, req, res);
    });

    //Rota para deletar o registro de uma compra pelo id
    app.delete('/api/compra/:id', function (req, res) {
        app.api.controllers.compra.deleteListaCompra(app, req, res);
    });
}