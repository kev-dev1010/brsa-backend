// src/controllers/user.controller.js
const userService = require('../services/user.service');
const authService = require('../services/auth.service');

function getAllUsers(req, res) {
  const users = userService.getAllUsers();
  res.status(200).json(users);
}

function getUserById(req, res) {
  const user = userService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

function updateUser(req, res) {
  const updatedUser = userService.updateUser(req.params.id, req.body);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

function deleteUser(req, res) {
  const success = userService.deleteUser(req.params.id);
  if (success) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
}

async function createEmployee(req, res) {
  try {
    const { username, password, role } = req.body;
    // O papel 'admin' deve ser restrito. Apenas 'employee' ou outro
    if (role === 'admin') {
      return res.status(403).json({ success: false, message: 'Não é possível criar um usuário com o papel de administrador.' });
    }

    const result = await authService.register(username, password, role);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
}

async function createCustomer(req, res) {
  try {
    const { username, password } = req.body;
    // Chama o serviço de registro, mas força o papel 'customer'
    const result = await authService.register(username, password, 'customer');

    if (result.success) {
      res.status(201).json({ success: true, message: 'Cliente criado com sucesso!' });
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
}

function getProfile(req, res) {
  // O middleware isAuthenticated já injetou o ID do usuário em req.user.id
  const user = userService.getUserById(req.user.id);
  if (user) {
    res.status(200).json(user);
  } else {
    // Isso é improvável de acontecer se o token for válido
    res.status(404).json({ message: 'Perfil não encontrado.' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createEmployee,
  createCustomer,
  getProfile 
};