// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

// Middleware de role-based access control (RBAC)
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
}

// Rotas protegidas
router.get('/', isAuthenticated, isAdmin, userController.getAllUsers);
router.get('/:id', isAuthenticated, userController.getUserById);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);
router.post('/register', isAuthenticated, isAdmin, userController.createEmployee);

module.exports = router;
