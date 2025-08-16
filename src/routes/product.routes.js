// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

// Rota para criar um produto (protegida)
router.post('/', isAuthenticated, productController.create);

// Rota para listar todos os produtos (protegida)
router.get('/', isAuthenticated, productController.getAll);

// Rota para buscar um produto por ID (protegida)
router.get('/:id', isAuthenticated, productController.getById);

// Rota para atualizar um produto (protegida)
router.put('/:id', isAuthenticated, productController.update);

// Rota para deletar um produto (protegida)
router.delete('/:id', isAuthenticated, productController.remove);

module.exports = router;