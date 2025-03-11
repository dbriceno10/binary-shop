import { loginUser } from './dao.js';

import Header from '../components/header.js';

const header = document.getElementById('header');
header.appendChild(Header());

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await loginUser(username, password);
  if (response) {
    form.reset();
    window.location.href = '/binary-shop/index.html';
  }
});
