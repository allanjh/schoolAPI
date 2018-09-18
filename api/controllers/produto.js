// Exporta a função que recupera o registro de um produto de acordo com o id
module.exports.getProdutoPorId = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Recupera o id passado como parametro
    var idProduto = req.params.id;

    // Acessa o método de recuperar um Produto através do id, esperando o retorno de um possível
    // erro ou resultado do select
    produtos.getProdutoPorId(idProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = { error: "Produto não encontrado!" };
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função que recupera o registro de um produto de acordo com o EAN
module.exports.getProdutoPorEAN = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Recupera o EAN passado como parametro
    var eanProduto = req.params.ean;

    // Acessa o método de recuperar um Produto através do EAN, esperando o retorno de um possível
    // erro ou resultado do select
    produtos.getProdutoPorEAN(eanProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = { error: "Produto não encontrado!" };
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função que recupera uma lista de produtos de acordo com a categoria
module.exports.getProdutosPorCategoria = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Recupera o EAN passado como parametro
    var categoriaProduto = req.params.id;

    // Acessa o método de recuperar uma lista de produtos de acordo com o id da categoria, 
    // esperando o retorno de um possível erro ou resultado do select
    produtos.getProdutosPorCategoria(categoriaProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = { error: "Produto não encontrado!" };
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

// Exporta a função que recupera uma lista de produtos de acordo com a marca
module.exports.getProdutosPorMarca = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Recupera o EAN passado como parametro
    var marcaProduto = req.params.id;

    // Acessa o método de recuperar uma lista de produtos de acordo com o id da categoria, 
    // esperando o retorno de um possível erro ou resultado do select
    produtos.getProdutosPorMarca(marcaProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            if (result == '') {
                result = { error: "Produto não encontrado!" };
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

//Exporta a função que insere um novo produto no banco de dados
module.exports.insertProduto = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Importa a biblioteca file system do NodeJS
    var fs = require('fs');
    // Importa classe Helper para saber se o objeto está vazio
    var helper = new app.api.helpers.UtilHelper();

    // Recupera os dados enviados via POST
    var novoProduto = req.body;

    // Verifica se foi enviada imagem para o produto
    if (!helper.isEmpty(req.files)) {

        // Instancia o objeto DataHelper para conseguir o Timestamp
        var dataHelper = new app.api.helpers.DataHelper();

        // Recupera o caminho da imagem na pasta temporária do servidor
        var caminhoImagemProduto = req.files.imagem_produto.path;
        // recupera o nome da imagem e quebra em um array para conseguir a extensão
        var nomeImagem = req.files.imagem_produto.name.split(".");
        // cria o novo nome com a extensão do arquivo
        var novoNomeImagem = dataHelper.getDataEmMilisegundos() + '.' + nomeImagem[1];
        // Estabelece o caminho de destino da imagem
        var destinoImagemProduto = './api/images/' + novoNomeImagem;

        fs.rename(caminhoImagemProduto, destinoImagemProduto, function (err) {
            if (err) {
                // Caso ocorra algum erro ele será enviado como resposta
                res.status(500).json({ error: err });
                // Para o fluxo do programa
                return;

            } else {
                // Verifica as informações passadas
                req.assert('nome_produto', 'Nome do produto é obrigatório').notEmpty();

                if (novoProduto.marca_produto_idmarca_produto == "") {
                    novoProduto.marca_produto_idmarca_produto = "7";
                }
                if (novoProduto.categoria_produto_idcategoria_produto == "") {
                    novoProduto.categoria_produto_idcategoria_produto = "6";
                }

                novoProduto.imagem_produto = novoNomeImagem;

                // Faz a verificação e passa os resultados da mesma para a variável erros
                var erros = req.validationErrors();

                // Se houver erros 
                if (erros) {
                    // responde a requisição retornando os erros que ocorreram
                    res.status(400).json(erros);
                    // para o fluxo do código
                    return;
                }

                // Acessa o método de inserir um novo Produto esperando o retorno de um possível
                // erro ou resultado da inserção
                produtos.insertProduto(novoProduto, function (error, result) {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.json(result);
                    }
                });
            }
        });

    } else {
        // Verifica as informações passadas
        req.assert('nome_produto', 'Nome do produto é obrigatório').notEmpty();

        if (novoProduto.marca_produto_idmarca_produto == "") {
            novoProduto.marca_produto_idmarca_produto = "7";
        }
        if (novoProduto.categoria_produto_idcategoria_produto == "") {
            novoProduto.categoria_produto_idcategoria_produto = "6";
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

        // Acessa o método de inserir um novo Produto esperando o retorno de um possível
        // erro ou resultado da inserção
        produtos.insertProduto(novoProduto, function (error, result) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.json(result);
            }
        });

    }


}

//Exporta a função que atualiza um novo produto no banco de dados
module.exports.updateProduto = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto PromocaoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Importa a biblioteca file system do NodeJS
    var fs = require('fs');
    // Importa classe Helper para saber se o objeto está vazio
    var helper = new app.api.helpers.UtilHelper();

    // Recupera o id do Produto
    var idProduto = req.params.id;
    // Recupera os dados enviados via POST
    var novoProduto = req.body;

    // Verifica se foi enviada imagem para o produto
    if (!helper.isEmpty(req.files)) {

        // Instancia o objeto DataHelper para conseguir o Timestamp
        var dataHelper = new app.api.helpers.DataHelper();

        // Recupera o caminho da imagem na pasta temporária do servidor
        var caminhoImagemProduto = req.files.imagem_produto.path;
        // recupera o nome da imagem e quebra em um array para conseguir a extensão
        var nomeImagem = req.files.imagem_produto.name.split(".");
        // cria o novo nome com a extensão do arquivo
        var novoNomeImagem = dataHelper.getDataEmMilisegundos() + '.' + nomeImagem[1];
        // Estabelece o caminho de destino da imagem
        var destinoImagemProduto = './api/images/' + novoNomeImagem;

        // Insere o nome da imagem no array para ser gravado no banco de dados
        novoProduto.imagem_produto = novoNomeImagem;

        fs.rename(caminhoImagemProduto, destinoImagemProduto, function (err) {
            if (err) {
                // Caso ocorra algum erro ele será enviado como resposta
                res.status(500).json({ error: err });
                // Para o fluxo do programa
                return;

            } else {
                // Verifica as informações passadas
                req.assert('nome_produto', 'Nome do produto é obrigatório').notEmpty();

                if (novoProduto.marca_produto_idmarca_produto == "") {
                    novoProduto.marca_produto_idmarca_produto = "7";
                }
                if (novoProduto.categoria_produto_idcategoria_produto == "") {
                    novoProduto.categoria_produto_idcategoria_produto = "6";
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

                // Acessa o método de atualizar o registro de um Produto esperando o retorno de um possível
                // erro ou resultado da inserção
                produtos.updateProduto([novoProduto, idProduto], function (error, result) {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.json(result);
                    }
                });
            }
        });

    } else {
        // Verifica as informações passadas
        req.assert('nome_produto', 'Nome do produto é obrigatório').notEmpty();

        if (novoProduto.marca_produto_idmarca_produto == "") {
            novoProduto.marca_produto_idmarca_produto = "7";
        }
        if (novoProduto.categoria_produto_idcategoria_produto == "") {
            novoProduto.categoria_produto_idcategoria_produto = "6";
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

        // Acessa o método de atualizar o registro de um Produto esperando o retorno de um possível
        // erro ou resultado da inserção
        produtos.updateProduto([novoProduto, idProduto], function (error, result) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.json(result);
            }
        });

    }

}

// Exporta a função que recupera o registro de um produto de acordo com o id
module.exports.deleteProduto = function (app, req, res) {

    // Estabelece a conexão com o banco de dados
    var connection = app.config.dbConnection();
    // Instancia o objeto ProdutoDAO e passa a conexão por parametro para ele
    var produtos = new app.api.models.ProdutoDAO(connection);
    // Recupera o id passado como parametro
    var idProduto = req.params.id;

    // Acessa o método de deletar um Produto através do id, esperando o retorno de um possível
    // erro ou resultado do select
    produtos.deleteProduto(idProduto, function (error, result) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(result);
        }
    });
}