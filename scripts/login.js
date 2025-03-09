import { loginUser } from './dao.js';
import Header from '../components/header.js';

const header = document.getElementById('header');
const div = document.createElement('div');
div.className = 'headerAuth';
div.innerHTML = `
  <img src="../assets/logo-full.png" alt="binary-shop" id="binary-shop">
  <div><button class="baseBtn">Login</button><button class="baseBtn">Registro</button></div>
`;
header.appendChild(Header());

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await loginUser(username, password);
  if (response) {
    localStorage.setItem('user', JSON.stringify(response));
    form.reset();
    window.location.href = '/index.html';
  }
});
