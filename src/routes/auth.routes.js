// src/routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register); // Adicione esta linha

module.exports = router;