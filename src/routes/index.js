// src/routes/index.js
const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bem-vindo à API do projeto BRSA!'
    });
});

module.exports = router;