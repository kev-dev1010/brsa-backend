// src/controllers/product.controller.js
const productService = require('../services/product.service');

function getAll(req, res) {
  const products = productService.getAll();
  res.status(200).json(products);
}

function getById(req, res) {
  const product = productService.getById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Produto não encontrado.' });
  }
}

function create(req, res) {
  const newProduct = productService.create(req.body);
  res.status(201).json(newProduct);
}

function update(req, res) {
  const updatedProduct = productService.update(req.params.id, req.body);
  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Produto não encontrado.' });
  }
}

function remove(req, res) {
  const success = productService.remove(req.params.id);
  if (success) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).json({ message: 'Produto não encontrado.' });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};