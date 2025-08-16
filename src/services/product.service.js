// src/services/product.service.js
const productRepository = require('../repositories/product.repository');

function getAll() {
  return productRepository.getAll();
}

function getById(id) {
  return productRepository.getById(id);
}

function create(newProduct) {
  return productRepository.create(newProduct);
}

function update(id, updatedProduct) {
  return productRepository.update(id, updatedProduct);
}

function remove(id) {
  return productRepository.remove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};