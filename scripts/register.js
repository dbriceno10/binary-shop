import { registerUser } from './repository.js';
import { validatePassword } from './utils.js';

import Header from '../components/header.js';

const header = document.getElementById('header');
header.appendChild(Header());

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const lastName = document.getElementById('lastname').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  const rol = document.getElementById('rol').value;
  const creditCard = document.getElementById('creditCard').value;
  const address = document.getElementById('address').value;
  const ccv = document.getElementById('ccv').value;
  const expirationDate = document.getElementById('expirationDate').value;

  const errorMessge = validatePassword(password, password2);
  if (errorMessge) {
    alert(errorMessge);
  } else {
    const response = await registerUser({
      name,
      lastName,
      username,
      password,
      rol,
      creditCard,
      address,
      ccv,
      expiration,
    });
    if (response) {
      form.reset();
      window.location.href = '/index.html';
    }
  }
});
