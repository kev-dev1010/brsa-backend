// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const protectedRoutes = require('./protected.routes'); // Adicione esta linha

router.use('/auth', authRoutes);
router.use('/protected', protectedRoutes); // Adicione esta linha

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bem-vindo à API do projeto BRSA!'
    });
});

module.exports = router;