// src/repositories/product.repository.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE_PATH = path.resolve(__dirname, '../../db.json');

function readDbFile() {
  const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDbFile(data) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function getAll() {
  const db = readDbFile();
  return db.products;
}

function getById(id) {
  const db = readDbFile();
  return db.products.find(p => p.id === id);
}

function create(newProduct) {
  const db = readDbFile();
  const product = { id: uuidv4(), ...newProduct };
  db.products.push(product);
  writeDbFile(db);
  return product;
}

function update(id, updatedProduct) {
  const db = readDbFile();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) {
    return null;
  }
  db.products[index] = { ...db.products[index], ...updatedProduct };
  writeDbFile(db);
  return db.products[index];
}

function remove(id) {
  const db = readDbFile();
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== id);
  writeDbFile(db);
  return db.products.length < initialLength;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};