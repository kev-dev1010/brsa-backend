// src/services/auth.service.js
const userRepository = require('../repositories/user.repository');
const tokenManager = require('../utils/tokenManager');
const bcrypt = require('bcrypt');

async function login(username, password) {
  const user = userRepository.getByUsername(username);
  
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { success: false, message: 'Senha incorreta.' };
  }

  const token = tokenManager.generateToken({ id: user.id, role: user.role });

  return { success: true, message: 'Login realizado com sucesso!', token };
}

async function register(username, password, role = 'customer') {
  const existingUser = userRepository.getByUsername(username);
  if (existingUser) {
    return { success: false, message: 'Nome de usuário já existe.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: hashedPassword,
    role: role,
  };

  const createdUser = userRepository.create(newUser);
  const token = tokenManager.generateToken({ id: createdUser.id, role: createdUser.role });

  return { success: true, message: 'Usuário registrado com sucesso!', token };
}

module.exports = { login, register };