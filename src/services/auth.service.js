// src/services/auth.service.js
const users = require('../models/User'); // Simula o DB
const tokenManager = require('../utils/tokenManager');
const bcrypt = require('bcrypt'); // Adicione esta linha

async function login(username, password) {
  const user = users.find(u => u.username === username);

  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }

  // Altere esta linha para usar bcrypt.compare
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { success: false, message: 'Senha incorreta.' };
  }

  const token = tokenManager.generateToken({ id: user.id, role: user.role });

  return { success: true, message: 'Login realizado com sucesso!', token };
}

async function register(username, password, role='customer') {
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return { success: false, message: 'Nome de usuário já existe.' };
  }

  // Criptografa a senha antes de "salvar"
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role:role,
  };

  // Simula o salvamento no DB
  users.push(newUser);

  const token = tokenManager.generateToken({ id: newUser.id, role: newUser.role });

  return { success: true, message: 'Usuário registrado com sucesso!', token };
}

module.exports = { login, register }; // Exporte a nova função 'register'