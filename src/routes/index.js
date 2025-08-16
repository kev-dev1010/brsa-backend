// src/routes/index.js
const express = require('express');
const router = express.Router();

// Importa as rotas de autenticação
const authRoutes = require('./auth.routes');

// Monta as rotas
router.use('/auth', authRoutes);
console.log(authRoutes);


// Rota de teste
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bem-vindo à API do projeto BRSA!'
    });
});

module.exports = router;