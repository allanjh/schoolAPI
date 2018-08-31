// Exporta a função de listar supermercados
module.exports.getSupermercados = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);

    // Acessa o método de listar Supermercados esperando o retorno de um possível
    // erro ou resultado
    supermercados.getSupermercados(function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(result);
        }

    });
}

// Exporta a função de recuperar um supermercado de acordo com o id
module.exports.getSupermercado = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);
    // Recupera o id passado como parametro
    var idSupermercado = req.params.id;

    // Acessa o método de listar Supermercados esperando o retorno de um possível
    // erro ou resultado
    supermercados.getSupermercado(idSupermercado ,function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(result);
        }
    });
}

module.exports.insertSupermercado = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);
    // Verifica as informações passadas
    // TODO: Fazer as verificações
    var novoSupermercado = req.body;

    // Acessa o método de listar Supermercados esperando o retorno de um possível
    // erro ou resultado
    supermercados.getSupermercado(idSupermercado ,function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(result);
        }
    });
}