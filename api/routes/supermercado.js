// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar a lista de supermercados
    app.get('/api/supermercado', function (req, res) {
        app.api.controllers.supermercado.getSupermercados(app, req, res);
    });

    //Rota para pegar os dados de um supermercado a partir do id
    app.get('/api/supermercado/:id', function (req, res) {
        app.api.controllers.supermercado.getSupermercado(app, req, res);
    });

    //Rota para incluir um novo supermercado
    app.post('/api/supermercado', function (req, res) {
        app.api.controllers.supermercado.insertSupermercado(app, req, res);
    });
}