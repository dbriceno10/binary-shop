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

const render = () => {
  const productos = getCart();
  if (productos.length) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';
    CardContainer(
      contenedorProductos,
      productos,
      'Eliminar del carrito',
      '',
      'true'
    );
    productos.forEach((producto) => {
      addEventListenersActionA(producto, addProductToCard);
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
  // const productos = getCart();
  render();
});
