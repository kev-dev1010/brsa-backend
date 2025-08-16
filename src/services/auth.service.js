// src/services/auth.service.js
const users = require('../models/User'); // Simula o DB
const tokenManager = require('../utils/tokenManager');

async function login(username, password) {
  const user = users.find(u => u.username === username);

  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }

  // Por enquanto, a senha não é criptografada
  if (user.password !== password) {
    return { success: false, message: 'Senha incorreta.' };
  }

  const token = tokenManager.generateToken({ id: user.id, role: user.role });

  return { success: true, message: 'Login realizado com sucesso!', token };
}

module.exports = { login };