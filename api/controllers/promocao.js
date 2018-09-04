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
            if (result == '') {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Exporta a função que insere uma nova promoção no banco de dados
module.exports.insertPromocao = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia objeto DataHelper para trabalhar com datas
    var dataHelper = new app.api.helpers.DataHelper();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);

    // Recupera os dados enviados via POST
    var novaPromocao = req.body;

    // Verifica as informações passadas
    req.assert('idsupermercado', 'ID do supermercado é obrigatório').notEmpty();
    req.assert('idsupermercado', 'ID do supermercado deve ser um Número').isInt();
    req.assert('data_inicio_promocao', 'o campo data inicio promoção é obrigatório').notEmpty();
    req.assert('data_fim_promocao', 'o campo data fim promoção é obrigatório').notEmpty();

    // Faz a verificação das datas utilizando o DataHelper e passa os resultados da mesma para o array variaveis
    var dataInicioEValida = dataHelper.isDataValida(novaPromocao.data_inicio_promocao, "o campo data inicio promoção deve ser YYYY-MM-DD HH:MM:SS");
    var dataFimEValida = dataHelper.isDataValida(novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser YYYY-MM-DD HH:MM:SS");
    var dataMaiorQueHoje = dataHelper.isDataMaiorQueHoje(novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser maior que hoje!");
    var dataInicioMenorQueFim = dataHelper.isDataMaiorQue(novaPromocao.data_inicio_promocao, novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser maior que o de data Inicio!");

    // inicializa o array com as variaveis de erros;
    var variaveis = [dataFimEValida, dataInicioEValida, dataMaiorQueHoje, dataInicioMenorQueFim, req.validationErrors()];
    var erros = [];

    //Faz a verificação se houve algum erro
    for (var i = 0; i < variaveis.length; i++) {
        if (variaveis[i]) {
            erros.push(variaveis[i]);
        }
    }

    // Se houver erros 
    if (erros.length > 0) {
        console.log('Dentro do erros');
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
    // Instancia objeto DataHelper para trabalhar com datas
    var dataHelper = new app.api.helpers.DataHelper();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);

    // Recupera os dados enviados via POST
    var novaPromocao = req.body;
    // Recupera o parametro do id da promocao
    var idpromocao = req.params.id;

    // Verifica as informações passadas
    req.assert('idsupermercado', 'ID do supermercado é obrigatório').notEmpty();
    req.assert('idsupermercado', 'ID do supermercado deve ser um Número').isInt();
    req.assert('data_inicio_promocao', 'o campo data inicio promoção é obrigatório').notEmpty();
    req.assert('data_fim_promocao', 'o campo data fim promoção é obrigatório').notEmpty();

    // Faz a verificação das datas utilizando o DataHelper e passa os resultados da mesma para o array variaveis
    var dataInicioEValida = dataHelper.isDataValida(novaPromocao.data_inicio_promocao, "o campo data inicio promoção deve ser YYYY-MM-DD HH:MM:SS");
    var dataFimEValida = dataHelper.isDataValida(novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser YYYY-MM-DD HH:MM:SS");
    var dataMaiorQueHoje = dataHelper.isDataMaiorQueHoje(novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser maior que hoje!");
    var dataInicioMenorQueFim = dataHelper.isDataMaiorQue(novaPromocao.data_inicio_promocao, novaPromocao.data_fim_promocao, "o campo data fim promoção deve ser maior que o de data Inicio!");

    // inicializa o array com as variaveis de erros;
    var variaveis = [dataFimEValida, dataInicioEValida, dataMaiorQueHoje, dataInicioMenorQueFim, req.validationErrors()];
    var erros = [];

    //Faz a verificação se houve algum erro
    for (var i = 0; i < variaveis.length; i++) {
        if (variaveis[i]) {
            erros.push(variaveis[i]);
        }
    }

    // Se houver erros 
    if (erros.length > 0) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }


    // Acessa o método de inserir uma nova promoção esperando o retorno de um possível
    // erro ou resultado da inserção
    promocoes.updatePromocao([novaPromocao, idpromocao], function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

//Exporta a função que deleta o cadastro de uma promoção de acordo com o id
module.exports.deletePromocao = function (app, req, res) {
    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var promocoes = new app.api.models.PromocaoDAO(connection);

    // Recupera o id da Promoção
    var idPromocao = req.params.id;

    // Acessa o método de deletar o registro de uma Promoção, esperando o retorno de um possível
    // erro ou resultado do delete
    promocoes.deletePromocao(idPromocao, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}