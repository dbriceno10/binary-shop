import { registerUser } from './repository.js';
import { validatePassword } from './utils.js';
import { updateUser } from './repository.js';

import Header from '../components/header.js';
import { roles } from './constants.js';

const header = document.getElementById('header');
header.appendChild(Header());

const form = document.getElementById('loginForm');
const name = document.getElementById('name').value;
const lastName = document.getElementById('lastname').value;
const username = document.getElementById('username').value;
const rol = document.getElementById('rol').value;
const creditCard = document.getElementById('creditCard').value;
const address = document.getElementById('address').value;
const ccv = document.getElementById('ccv').value;
const expirationDate = document.getElementById('expirationDate').value;
const user = JSON.parse(localStorage.getItem('user'));

if (!user || user.rol !== roles.BUYER) {
  window.location.href = '/binary-shop/';
} else {
  name.value = user.name;
  lastName.value = user.lastName;
  username.value = user.username;
  rol.value = user.rol;
  creditCard.value = user.creditCard;
  address.value = user.address;
  ccv.value = user.ccv;
  expirationDate.value = user.expirationDate;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await registerUser({
    name,
    lastName,
    username,
    rol,
    creditCard,
    address,
    ccv,
    expirationDate,
  });
  if (response) {
    form.reset();
    window.location.href = '/';
  }
});
