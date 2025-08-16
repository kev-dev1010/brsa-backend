// src/routes/protected.routes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');

router.get('/profile', isAuthenticated, (req, res) => {
  // req.user contém as informações do token, injetadas pelo middleware
  const { id, role } = req.user;
  res.status(200).json({
    message: 'Bem-vindo ao seu perfil!',
    user: { id, role }
  });
});

module.exports = router;