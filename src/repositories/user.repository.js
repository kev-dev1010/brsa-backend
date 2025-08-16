// src/repositories/user.repository.js
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
  return db.users;
}

function getById(id) {
  const db = readDbFile();
  return db.users.find(u => u.id === id);
}

function getByUsername(username) {
  const db = readDbFile();
  return db.users.find(u => u.username === username);
}

function create(newUser) {
  const db = readDbFile();
  const user = { id: uuidv4(), ...newUser };
  db.users.push(user);
  writeDbFile(db);
  return user;
}

function update(id, updatedUser) {
  const db = readDbFile();
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) {
    return null;
  }
  db.users[index] = { ...db.users[index], ...updatedUser };
  writeDbFile(db);
  return db.users[index];
}

function remove(id) {
  const db = readDbFile();
  const initialLength = db.users.length;
  db.users = db.users.filter(u => u.id !== id);
  writeDbFile(db);
  return db.users.length < initialLength;
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  create,
  update,
  remove
};