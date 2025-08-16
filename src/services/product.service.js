// src/services/product.service.js
const products = require('../models/Product'); // Simula o DB

function getAll() {
  return products;
}

function getById(id) {
  return products.find(p => p.id === parseInt(id));
}

function create(newProduct) {
  const product = { id: products.length + 1, ...newProduct };
  products.push(product);
  return product;
}

function update(id, updatedProduct) {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return null;
  }
  products[index] = { ...products[index], ...updatedProduct };
  return products[index];
}

function remove(id) {
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return false;
  }
  products.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};