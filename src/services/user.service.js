const userRepository = require('../repositories/user.repository');

function getAllUsers() {
  // Pega a lista completa de usuários do repositório
  const users = userRepository.getAll();
  // Usa .map() para iterar sobre a lista e criar uma nova lista sem a senha
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}

function getUserById(id) {
  const user = userRepository.getById(id);
  if (!user) {
    return null;
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function updateUser(id, updatedData) {
  const updatedUser = userRepository.update(id, updatedData);
  if (!updatedUser) {
    return null;
  }
  const { password, ...updatedUserWithoutPassword } = updatedUser;
  return updatedUserWithoutPassword;
}

function deleteUser(id) {
  return userRepository.remove(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};