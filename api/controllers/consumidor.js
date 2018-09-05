// Exporta a função de listar consumidores
module.exports.getConsumidores = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);

    // Acessa o método de listar os consumidores esperando o retorno de um possível
    // erro ou resultado
    consumidores.getConsumidores(function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(result);
        }

    });
}

// Exporta a função de recuperar um consumidor de acordo com o id
module.exports.getConsumidor = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);
    // Recupera o id passado como parametro
    var idConsumidor = req.params.id;

    // Acessa o método de recuperar um Consumidor através do id, esperando o retorno de um possível
    // erro ou resultado do select
    consumidores.getConsumidor(idConsumidor, function (error, result) {
        if (error) {
            res.status(404).json(error);
        } else {
            if (result == '') {
                result = {error: "Consumidor nao encontrado!"};
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Exporta a função que insere um novo consumidor no banco de dados
module.exports.insertConsumidor = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);

    //Cria um consumidor vazio
    novoConsumidor = {'email_consumidor': '', 'senha_consumidor': '', 'nome_consumidor': ''};

    // Acessa o método de inserir um novo Consumidor esperando o retorno de um possível
    // erro ou resultado da inserção
    consumidores.insertConsumidor(novoConsumidor, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função de que atualiza o cadastro de um consumidor de acordo com o id
module.exports.updateConsumidor = function (app, req, res) {
    
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);

    // Recupera o id do Consumidor
    var idConsumidor = req.params.id;
    // Recupera os dados enviados via PUT
    var novoConsumidor = req.body;

    // Verifica as informações passadas
    req.assert('email_consumidor', 'email do consumidor é obrigatório').notEmpty();
    req.assert('email_consumidor', 'O email nao é válido').isEmail();
    
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
    consumidores.updateConsumidor([novoConsumidor, idConsumidor], function (error, result) {
        if (error) {
            res.status(304).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função de que insere a localização de um consumidor de acordo com o id
module.exports.insereLocalizacaoConsumidor = function (app, req, res) {
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);

    // Recupera o id do Consumidor
    var idConsumidor = req.params.id;
    // Recupera os dados enviados via POST
    var localizacaoConsumidor = req.body;

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

    // Acessa o método de atualizar o registro do Consumidor, esperando o retorno de um possível
    // erro ou resultado do insert
    consumidores.insereLocalizacaoConsumidor([novoSupermercado, idSupermercado], function (error, result) {
        if (error) {
            res.status(304).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função que deleta o cadastro de um consumidor de acordo com o id
module.exports.deleteConsumidor = function (app, req, res) {
    
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ConsumidorDAO e passa a conexão por parametro para ele
    var consumidores = new app.api.models.ConsumidorDAO(connection);

    // Recupera o id do Consumidor
    var idConsumidor = req.params.id;

    // Acessa o método de deletar o registro de um Consumidor, esperando o retorno de um possível
    // erro ou resultado do delete
    consumidores.deleteConsumidor(idConsumidor, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}