// exporta função recebendo como parâmetro a variável app
module.exports = function (app) {

    //Rota para pegar a lista de consumidores
    app.get('/api/consumidor', function (req, res) {
        app.api.controllers.consumidor.getConsumidores(app, req, res);
    });

    //Rota para pegar os dados de um consumidor a partir do id
    app.get('/api/consumidor/:id', function (req, res) {
        app.api.controllers.consumidor.getConsumidor(app, req, res);
    });

    //Rota para incluir um novo consumidor
    app.post('/api/consumidor', function (req, res) {
        app.api.controllers.consumidor.insertConsumidor(app, req, res);
    });

    //Rota para atualizar o cadastro de um usuario pelo id
    app.put('/api/consumidor/:id', function (req, res) {
        app.api.controllers.consumidor.updateConsumidor(app, req, res);
    });

    //Rota para deletar o cadastro de um consumidor pelo id
    app.delete('/api/consumidor/:id', function (req, res) {
        app.api.controllers.consumidor.deleteConsumidor(app, req, res);
    });
}