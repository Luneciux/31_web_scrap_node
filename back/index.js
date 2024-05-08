const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3001;

// Rota para lidar com a requisição de web scraping
app.get('/scrape', async (req, res) => {
    try {
        const { url, keyword } = req.query;
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const text = dom.window.document.body.textContent;
        const result = text.includes(keyword);
        res.json({ found: result });
    } catch (error) {
        console.error('Erro ao realizar web scraping:', error);
        res.status(500).json({ error: 'Erro ao realizar web scraping' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
