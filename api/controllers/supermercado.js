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

    // Acessa o método de recuperar um Supermercado através do id, esperando o retorno de um possível
    // erro ou resultado do select
    supermercados.getSupermercado(idSupermercado, function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            if (result == '') {
                result = {error: "Supermercado nao encontrado!"};
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Exporta a função que insere um novo supermercado no banco de dados
module.exports.insertSupermercado = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);

    // Recupera os dados enviados via POST
    var novoSupermercado = req.body;

    // Verifica as informações passadas
    req.assert('nome_supermercado', 'Nome do supermercado é obrigatório').notEmpty();
    req.assert('nome_supermercado', 'Nome do supermercado deve conter no mínimo 3 e no máximo 45 caracteres').len(3, 45);
    req.assert('rua_supermercado', 'o campo rua do supermercado é obrigatório').notEmpty();
    req.assert('rua_supermercado', 'o campo rua do supermercado deve conter no mínimo 5 caracteres').len(5, 120);
    req.assert('bairro_supermercado', 'o campo bairro do supermercado é obrigatório').notEmpty();
    req.assert('bairro_supermercado', 'o campo bairro do supermercado deve conter no mínimo 2 caracteres').len(2, 45);
    req.assert('cep_supermercado', 'o campo cep do supermercado é obrigatório').notEmpty();
    req.assert('cep_supermercado', 'o campo cep do supermercado deve conter no mínimo 8 caracteres').len(8, 9);
    req.assert('cidade_supermercado', 'o campo cidade do supermercado é obrigatório').notEmpty();
    req.assert('cidade_supermercado', 'o campo cidade do supermercado deve conter no mínimo 2 caracteres').len(2, 45);
    req.assert('estado_supermercado', 'o campo estado do supermercado é obrigatório').notEmpty();
    req.assert('estado_supermercado', 'o campo estado do supermercado deve conter no mínimo 3 caracteres').len(3, 45);

    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de inserir um novo Supermercado esperando o retorno de um possível
    // erro ou resultado da inserção
    supermercados.insertSupermercado(novoSupermercado, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função de que atualiza o cadastro de um supermercado de acordo com o id
module.exports.updateSupermercado = function (app, req, res) {
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);

    // Recupera o id do Supermercado
    var idSupermercado = req.params.id;
    // Recupera os dados enviados via PUT
    var novoSupermercado = req.body;

    // Verifica as informações passadas
    req.assert('nome_supermercado', 'Nome do supermercado é obrigatório').notEmpty();
    req.assert('nome_supermercado', 'Nome do supermercado deve conter no mínimo 3 e no máximo 45 caracteres').len(3, 45);
    req.assert('rua_supermercado', 'o campo rua do supermercado é obrigatório').notEmpty();
    req.assert('rua_supermercado', 'o campo rua do supermercado deve conter no mínimo 5 caracteres').len(5, 120);
    req.assert('bairro_supermercado', 'o campo bairro do supermercado é obrigatório').notEmpty();
    req.assert('bairro_supermercado', 'o campo bairro do supermercado deve conter no mínimo 2 caracteres').len(2, 45);
    req.assert('cep_supermercado', 'o campo cep do supermercado é obrigatório').notEmpty();
    req.assert('cep_supermercado', 'o campo cep do supermercado deve conter no mínimo 8 caracteres').len(8, 9);
    req.assert('cidade_supermercado', 'o campo cidade do supermercado é obrigatório').notEmpty();
    req.assert('cidade_supermercado', 'o campo cidade do supermercado deve conter no mínimo 2 caracteres').len(2, 45);
    req.assert('estado_supermercado', 'o campo estado do supermercado é obrigatório').notEmpty();
    req.assert('estado_supermercado', 'o campo estado do supermercado deve conter no mínimo 3 caracteres').len(3, 45);

    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de atualizar o registro do Supermercado, esperando o retorno de um possível
    // erro ou resultado da atualização
    supermercados.updateSupermercado([novoSupermercado, idSupermercado], function (error, result) {
        if (error) {
            res.status(304).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função que deleta o cadastro de um supermercado de acordo com o id
module.exports.deleteSupermercado = function (app, req, res) {
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto SupermercadoDAO e passa a conexão por parametro para ele
    var supermercados = new app.api.models.SupermercadoDAO(connection);

    // Recupera o id do Supermercado
    var idSupermercado = req.params.id;
    
    // Acessa o método de deletar o registro de um Supermercado, esperando o retorno de um possível
    // erro ou resultado do delete
    supermercados.deleteSupermercado(idSupermercado, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}