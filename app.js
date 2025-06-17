// filepath: src/app.js
const express = require('express');
const axios = require('axios');
const app = express();

// Rota simples para buscar o CEP
app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar o CEP.' });
    }
});

module.exports = app;

