const express = require('express');
const router = express.Router();
const { isAuthenticated, isEmployeeOrAdmin, isAdmin } = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

// Nova rota para o perfil do usuário
router.get('/profile', isAuthenticated, userController.getProfile);

// Rotas protegidas
router.get('/', isAuthenticated, isAdmin, userController.getAllUsers);
router.get('/:id', isAuthenticated, userController.getUserById);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;