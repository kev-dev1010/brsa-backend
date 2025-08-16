// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated, isEmployeeOrAdmin, isAdmin } = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

// Rota para criar um produto (protegida)
router.post('/', isAuthenticated, isEmployeeOrAdmin, productController.create);

// Rota para listar todos os produtos (protegida)
router.get('/', productController.getAll);

// Rota para buscar um produto por ID (protegida)
router.get('/:id', productController.getById);

// Rota para atualizar um produto (protegida)
router.put('/:id', isAuthenticated, isEmployeeOrAdmin, productController.update);

// Rota para deletar um produto (protegida)
router.delete('/:id', isAuthenticated, isAdmin, productController.remove);

module.exports = router;