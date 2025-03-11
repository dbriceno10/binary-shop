import Header, { logoutEvent } from '../components/header.js';
import { getUsers } from './dao.js';
import { deleteUser } from './repository.js';
import { roles } from './constants.js';

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = '/binary-shop/login.html';
} else {
  if (user.rol !== roles.ADMIN) {
    window.location.href = '/binary-shop/';
  }
}

const render = async () => {
  const container = document.getElementById('contenedor-admin');
  let users = await getUsers();
  users = users.filter((u) => u.id !== user.id); // Filtrar los usuarios administradores
  container.innerHTML = ''; // Limpiar el contenedor antes de renderizar
  container.className = 'contenedor-admin';
  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-card';
    userDiv.innerHTML = `
      <p>${user.nombre} ${user.apellido}</p>
      <p>${user.rol}</p>
      <button id="deleteUser${user.id}" class="baseBtn">Eliminar</button>
    `;
    container.appendChild(userDiv);

    // Añadir evento al botón de eliminar
    const deleteButton = document.getElementById(`deleteUser${user.id}`);
    deleteButton.addEventListener('click', async () => {
      await deleteUser(user);
      render(); // Volver a renderizar la lista de usuarios después de eliminar
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  logoutEvent();
  await render();
});
