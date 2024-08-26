const express = require('express');
const app = express();
app.use(express.json());

let produtos = []; // Simulação de um banco de dados em memória
let idCounter = 1;

// Rota para obter um produto pelo ID
app.get('/api/produto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
    }
});

// Rota para obter todos os produtos
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// Rota para cadastrar um novo produto
app.post('/api/produto/cadastrar', (req, res) => {
    const { nome, quantidade } = req.body;
    const novoProduto = {
        id: idCounter++,
        nome,
        quantidade
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Rota para atualizar a quantidade de um produto existente
app.post('/api/produto/atualizar', (req, res) => {
    const { id, quantidade } = req.body;
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        produto.quantidade = quantidade;
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
    }
});

// Rota para excluir um produto pelo ID
app.post('/api/produto/excluir', (req, res) => {
    const { id } = req.body;
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        produtos.splice(index, 1);
        res.json({ message: 'Produto excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
    }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
