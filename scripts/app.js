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
  window.location.href = '../login.html';
} else if (user.rol === roles.SELLER) {
  window.location.href = '../seller.html';
} else if (user.rol === roles.ADMIN) {
  window.location.href = '../admin.html';
}

const render = async () => {
  let productos = await getProducts();
  productos = productos.filter((prod) => prod.cantidad > 0);
  CardContainer(productos, 'Agregar al carrito', 'Comprar');
  productos.forEach((producto) => {
    addEventListenersActionA(producto, addProductToCard);
    addEventListenersActionB(producto, async (prod) => {
      await buyProduct(prod);
      await render();
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  logoutEvent();
  await render();
});
