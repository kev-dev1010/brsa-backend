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

// Novo middleware para verificar se o usuário é um 'employee' ou 'admin'
function isEmployeeOrAdmin(req, res, next) {
  if (req.user && (req.user.role === 'employee' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas funcionários e administradores podem realizar esta ação.' });
  }
}

// Middleware de role-based access control (RBAC) para administradores
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
}

// Novo middleware para verificar se o usuário é um cliente
function isCustomer(req, res, next) {
  if (req.user && req.user.role === 'customer') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas clientes podem realizar esta ação.' });
  }
}

module.exports = { isAuthenticated, isAdmin, isEmployeeOrAdmin, isCustomer };