// src/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// Middleware para processar requisições JSON
app.use(express.json());

// Monta as rotas da API
app.use('/api', routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});