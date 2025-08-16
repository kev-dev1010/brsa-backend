// src/middlewares/auth.middleware.js
const tokenManager = require('../utils/tokenManager');

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho "Bearer <token>"

  const decoded = tokenManager.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }

  // Adiciona as informações do usuário à requisição
  req.user = decoded;

  next(); // Continua para a próxima função na cadeia (o controlador)
}

module.exports = { isAuthenticated };