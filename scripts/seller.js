import { getProducts } from './dao.js';
import { addProductToCard, buyProduct } from './repository.js';
import CardContainer from '../components/cardContainer.js';
import Header, { logoutEvent } from '../components/header.js';
import {
  addEventListenersActionA,
  addEventListenersActionB,
} from '../components/card.js';
import { roles } from './constants.js';

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = '/binary-shop/login.html';
} else if (user.rol === roles.ADMIN) {
  window.location.href = '/binary-shop/admin.html';
} else if (user.rol === roles.BUYER) {
  window.location.href = '/binary-shop/index.html';
}

const render = async () => {
  const createBtnContainer = document.getElementById('create');
  createBtnContainer.innerHTML = '';
  createBtnContainer.innerHTML = `
    <a href="./create-product.html">
      <button class="baseBtn">Crear producto</button>
    </a>
  `;
  let productos = await getProducts();
  productos = productos.filter(
    (prod) => prod.cantidad > 0 && prod.sellerId === user.id
  );
  CardContainer(productos);
};

document.addEventListener('DOMContentLoaded', async () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  logoutEvent();
  await render();
});
