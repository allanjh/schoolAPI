// Exporta a função de listar as listas de compras de um consumidor
module.exports.getCompraPorId = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idConsumidor = req.params.id;

    // Acessa o método de listar as listas de compras esperando o retorno de um possível
    // erro ou resultado
    compras.getCompraPorId(idConsumidor, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = {error: "Nenhuma Lista de compras encontrada!"};
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função de listar os produtos da lista de compras a parti do id da mesma
module.exports.getProdutosCompraPorId = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idCompra = req.params.id;

    // Acessa o método de listar os produtos da lista de compras esperando o retorno de um possível
    // erro ou resultado
    compras.getProdutosCompraPorId(idCompra, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = {error: "Nenhuma Lista de compras encontrada!"};
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função de criar uma lista de compras
module.exports.insertListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var novaLista = req.body;

    // Verifica as informações passadas
    req.assert('consumidor_idconsumidor', 'id do consumidor é obrigatório').notEmpty();
    req.assert('consumidor_idconsumidor', 'id do consumidor deve ser um número').isInt();

    if (novaLista.supermercado_idsupermercado == "") {
        novaLista.supermercado_idsupermercado = "9";
    }
    if (novaLista.total_compra == "") {
        novaLista.total_compra = "0.0";
    }

    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de criar uma nova lista de compras esperando o retorno de um possível
    // erro ou resultado
    compras.insertListaCompra(novaLista, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

// Exporta a função de atualizar uma lista de compras

// Exporta a função de atualizar uma lista de compras

// Exporta a função de deletar uma lista de compras

// Exporta a função de reulizar uma lista de compras

// Exporta a função de inserir um produto em uma lista de compras
module.exports.insertProdutoEmListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idCompra = req.params.id;
    var novoProduto = req.body;

    novoProduto.compra_idcompra = idCompra;

    // Verifica as informações passadas
    req.assert('produto_idproduto', 'id do produto é obrigatório').notEmpty();
    req.assert('produto_idproduto', 'id do consumidor deve ser um número').isInt();

    if (novoProduto.preco_produto_compra == "") {
        novoProduto.preco_produto_compra = "0.0";
    }
    if (novoProduto.quantidade_produto_compra == "") {
        novoProduto.quantidade_produto_compra = "0";
    }

    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de inserir um novo produto na lista de compras esperando o retorno
    // de um possível erro ou resultado
    compras.insertProdutoEmListaCompra(novoProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            // atualiza o total da lista de compras
            compras.updateTotalCompra([idCompra, idCompra], function (error, result) {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.json(result);
                }
            });
        }
    });
}

// Exporta a função de atualizar um produto em uma lista de compras

// Exporta a função de deletar um produto em uma lista de compras