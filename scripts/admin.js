import { getProducts } from './dao.js';
import { deleteProduct } from './repository.js';
import CardContainer from '../components/cardContainer.js';
import Header, { logoutEvent } from '../components/header.js';
import { addEventListenersActionA } from '../components/card.js';
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
  let productos = await getProducts();
  productos = productos.filter((prod) => prod.cantidad > 0);
  CardContainer(productos, 'Eliminar producto');
  productos.forEach((producto) => {
    addEventListenersActionA(producto, async () => {
      await deleteProduct(producto);
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
