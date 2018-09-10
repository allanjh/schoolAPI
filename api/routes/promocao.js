// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar a lista de promoções válidas
    app.get('/api/promocao', function (req, res) {
        app.api.controllers.promocao.getPromocoes(app, req, res);
    });

    //Rota para pegar os dados de uma promoção a partir do id
    app.get('/api/promocao/:id', function (req, res) {
        app.api.controllers.promocao.getPromocao(app, req, res);
    });

    //Rota para pegar uma lista de promoções de determinado supermercado
    //através do id do supermercado
    app.get('/api/promocao/supermercado/:id', function (req, res) {
        app.api.controllers.promocao.getPromocoesDoSupermercado(app, req, res);
    });

    //Rota para incluir uma nova promoção
    app.post('/api/promocao', function (req, res) {
        app.api.controllers.promocao.insertPromocao(app, req, res);
    });

    //Rota para incluir um produto em uma promoção
    app.post('/api/promocao/produtos', function (req, res) {
        app.api.controllers.promocao.insertProdutoPromocao(app, req, res);
    });

    //Rota para atualizar o registro de uma promoção pelo id
    app.put('/api/promocao/:id', function (req, res) {
        app.api.controllers.promocao.updatePromocao(app, req, res);
    });

    //Rota para deletar uma promoção pelo id
    app.delete('/api/promocao/:id', function (req, res) {
        app.api.controllers.promocao.deletePromocao(app, req, res);
    });
}