import { getCart } from './dao.js';
import {
  addProduct,
  removeProduct,
  removeProducts,
} from './repository.js';
import CardContainer from '../components/cardContainer.js';
import Header from '../components/header.js';
import {
  addEventListenersActionA,
  addEventListenersAddToCard,
  addEventListenersRemoveToCard,
} from '../components/card.js';
import { roles } from './constants.js';

const user = JSON.parse(localStorage.getItem('user'));

if (!user || user.rol !== roles.BUYER) {
  window.location.href = '/login.html';
}

const render = () => {
  const productos = getCart();
  if (productos.length) {
    CardContainer(productos, 'Eliminar del carrito', '', 'true');
    productos.forEach((producto) => {
      addEventListenersActionA(producto, (prod) => {
        removeProducts(prod);
        render();
      });
      addEventListenersRemoveToCard(producto, (prod) => {
        removeProduct(prod);
        render();
      });
      addEventListenersAddToCard(producto, async (prod) => {
        await addProduct(prod);
        render();
      });
    });
  } else {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '<h2>No hay productos en el carrito</h2>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  render();
});
