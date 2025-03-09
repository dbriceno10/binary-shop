import { getProducts, getCart } from './dao.js';
import { addProductToCard, addProduct, removeProduct } from './repository.js';
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

const updateCard = async () => {
  // const productos = await getCart();
  // CardContainer(productos, 'Eliminar del carrito', '', 'true');
};

document.addEventListener('DOMContentLoaded', async () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  const productos = await getCart();
  if (productos.length) {
    CardContainer(productos, 'Eliminar del carrito', '', 'true');
    productos.forEach((producto) => {
      addEventListenersActionA(producto, addProductToCard);
      addEventListenersRemoveToCard(producto, removeProduct);
      addEventListenersAddToCard(producto, (prod) => {
        addProduct(prod);
        updateCard();
      });
    });
  } else {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '<h2>No hay productos en el carrito</h2>';
  }
});
