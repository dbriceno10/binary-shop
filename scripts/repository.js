import { getUsers, findUser } from './dao.js';

export const registerUser = async (user) => {
  const users = await getUsers();
  const userExists = await findUser(user.username);
  if (userExists) {
    alert('El usuario ya esta registrado');
    return false;
  } else {
    user.id = new Date().getTime();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
};
