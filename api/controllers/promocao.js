// Exporta a função de listar promocoes validas
module.exports.getPromocoes = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);

    // Acessa o método de listar promoções esperando o retorno de um possível
    // erro ou resultado
    promocoes.getPromocoes(function (error, result) {
        if (result == '') {
            res.status(404).json(result);
        } else {
            if (result == '') {
                res.status(400).json(result);
            } else {
                res.json(result);
            }
        }

    });
}

// Exporta a função de recuperar uma promocao de acordo com o id
module.exports.getPromocao = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);
    // Recupera o id passado como parametro
    var idPromocao = req.params.id;

    // Acessa o método de recuperar uma promoção através do id, esperando o retorno de um possível
    // erro ou resultado do select
    promocoes.getPromocao(idPromocao, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função de recuperar uma lista de promocoes de um determinado supermercado
// de acordo com o id do supermercado
module.exports.getPromocoesDoSupermercado = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);
    // Recupera o id passado como parametro
    var idSupermercado = req.params.id;

    // Acessa o método de recuperar as promoções através do id do supermercado, 
    // esperando o retorno de um possível erro ou resultado do select
    promocoes.getPromocoesDoSupermercado(idSupermercado, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if(result == ''){
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Exporta a função que insere uma nova promoção no banco de dados
module.exports.insertPromocao = function (app, req, res) {

    //Importa módulo moment para trabalhar com as datas
    var moment = require('moment');

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);

    // Recupera os dados enviados via POST
    var novaPromocao = req.body;

    // Verifica as informações passadas
    req.assert('idsupermercado', 'ID do supermercado é obrigatório').notEmpty();
    req.assert('idsupermercado', 'ID do supermercado deve ser um Número').isInt();
    req.assert('data_inicio_promocao', 'o campo data inicio promoção é obrigatório').notEmpty();
    req.assert('data_fim_promocao', 'o campo data fim promoção é obrigatório').notEmpty();

    //Faz
    
    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de inserir uma nova promoção esperando o retorno de um possível
    // erro ou resultado da inserção
    promocoes.insertPromocao(novaPromocao, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função de que atualiza o registro de uma promoção de acordo com o id
module.exports.updatePromocao = function (app, req, res) {
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

//Exporta a função que deleta o cadastro de uma promoção de acordo com o id
module.exports.deletePromocao = function (app, req, res) {
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