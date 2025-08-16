// src/controllers/auth.controller.js
const authService = require('../services/auth.service');

async function login(req, res) {
  // ... (sem alterações na função de login)
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
}

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const result = await authService.register(username, password);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
}

module.exports = { login, register }; // Adicione 'register'