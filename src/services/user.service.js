// src/services/user.service.js
const users = require('../models/User'); // Simula o DB

function getAllUsers() {
  // Retorna todos os usuários sem a senha
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}

function getUserById(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function updateUser(id, updatedData) {
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = { ...users[userIndex], ...updatedData };
  const { password, ...updatedUserWithoutPassword } = users[userIndex];
  return updatedUserWithoutPassword;
}

function deleteUser(id) {
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) {
    return false;
  }
  users.splice(userIndex, 1);
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};