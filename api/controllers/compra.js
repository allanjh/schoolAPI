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
                result = { error: "Nenhuma Lista de compras encontrada!" };
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função de listar os produtos da lista de compras a partir do id da mesma
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
                result = { error: "Nenhuma Lista de compras encontrada!" };
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

// Exporta a função de atualizar o supermercado de uma lista de compras
module.exports.updateSupermercadoCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);
    // Recupera o id da compra
    var idCompra = req.params.id;
    // Recupera o id do supermercado 
    var novoSupermercadoCompra = req.body;

    // Verifica as informações passadas
    req.assert('supermercado_idsupermercado', 'id do supermercado é obrigatório').notEmpty();
    req.assert('supermercado_idsupermercado', 'id do supermercado deve ser um número').isInt();

    // Faz a verificação e passa os resultados da mesma para a variável erros
    var erros = req.validationErrors();

    // Se houver erros 
    if (erros) {
        // responde a requisição retornando os erros que ocorreram
        res.status(400).json(erros);
        // para o fluxo do código
        return;
    }

    // Acessa o método de atualizar o supermercado da lista de compras esperando o retorno de um possível
    // erro ou resultado
    compras.updateSupermercadoCompra([novoSupermercadoCompra, idCompra], function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}

// Exporta a função de deletar uma lista de compras
module.exports.deleteListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idCompra = req.params.id;

    // Acessa o método de deletar uma lista de compras esperando o retorno
    // de um possível erro ou resultado
    compras.deleteProdutosCompra(idCompra, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            // atualiza o total da lista de compras
            compras.deleteCompra(idCompra, function (error, result) {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.json(result);
                }
            });
        }
    });
}

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
module.exports.updateProdutoEmListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idCompra = req.params.idcompra;
    var idProduto = req.params.idproduto;
    var novoProduto = req.body;

    // Verifica as informações passadas
    req.assert('preco_produto_compra', 'preço do produto é obrigatório').notEmpty();
    req.assert('preco_produto_compra', 'preço do produto deve ser um número').isFloat();
    req.assert('quantidade_produto_compra', 'quantidade do produto é obrigatório').notEmpty();
    req.assert('quantidade_produto_compra', 'quantidade do produto deve ser um número').isInt();

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
    compras.updateProdutoEmListaCompra([novoProduto, idCompra, idProduto], function (error, result) {
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

// Exporta a função de deletar um produto em uma lista de compras
module.exports.deleteProdutoEmListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);

    var idCompra = req.params.idcompra;
    var idProduto = req.params.idproduto;

    // Acessa o método de inserir um novo produto na lista de compras esperando o retorno
    // de um possível erro ou resultado
    compras.deleteProdutoEmListaCompra([idCompra, idProduto], function (error, result) {
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

// Exporta a função de reutilizar uma lista de compras
module.exports.reuseListaCompra = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto CompraDAO e passa a conexão por parametro para ele
    var compras = new app.api.models.CompraDAO(connection);
    //Recupera o id da lista que será utilizada como base para a nova lista
    var idListaCompraBase = req.params.id;

    //Recupera a lista utilizada como base
    compras.getProdutosCompraPorId(idListaCompraBase, function (error, listaDeProdutos) {
        if (error) {
            //Caso aconteça algum erro o mesmo é retornado
            res.status(400).json(error);
        } else {
            //monta o objeto utlizado para criar a nova lista
            var novaLista = {
                "consumidor_idconsumidor": listaDeProdutos[0].consumidor_idconsumidor,
                "supermercado_idsupermercado": listaDeProdutos[0].supermercado_idsupermercado,
                "total_compra": 0.0
            };

            //Cria a nova lista
            compras.insertListaCompra(novaLista, function (error, result) {
                if (error) {
                    res.status(400).json(error);
                } else {
                    //Recupera o id da compra criada
                    var idCompraCriada = result.insertId;

                    var novosProdutos = [];

                    //monta array de produtos
                    for (let i = 0; i < listaDeProdutos.length; i++) {
                        novosProdutos.push([
                            listaDeProdutos[i].produto_idproduto,
                            idCompraCriada,
                            listaDeProdutos[i].preco_produto_compra,
                            listaDeProdutos[i].quantidade_produto_compra,
                        ]);

                    }

                    //Insere os novos produtos na lista recem criada
                    compras.insertProdutosEmListaCompra([novosProdutos], function (error, result) {
                        if (error) {
                            res.status(400).json(error);
                        } else {
                            // atualiza o total da lista de compras
                            compras.updateTotalCompra([idCompraCriada, idCompraCriada], function (error, result) {
                                if (error) {
                                    res.status(400).json(error);
                                } else {
                                    compras.getProdutosCompraPorId(idCompraCriada, function (error, result) {
                                        if (error) {
                                            res.status(400).json(error);
                                        } else {
                                            if (result == '') {
                                                result = { error: "Nenhuma Lista de compras encontrada!" };
                                                res.status(404).json(result);
                                            } else {
                                                res.json(result);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });


        }
    });
}