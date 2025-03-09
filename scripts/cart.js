import { getCart } from './dao.js';
import {
  addProduct,
  removeProduct,
  removeProducts,
  clearCart,
  buyProducts,
} from './repository.js';
import CardContainer from '../components/cardContainer.js';
import Header, { logoutEvent } from '../components/header.js';
import {
  addEventListenersActionA,
  addEventListenersAddToCard,
  addEventListenersRemoveToCard,
} from '../components/card.js';
import { roles } from './constants.js';
import { financialFormat } from './utils.js';

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
    const botones = document.getElementById('cartButtons');
    botones.innerHTML = '';
    botones.innerHTML = `
      <button class="baseBtn" id="vaciar-carrito">Vaciar carrito</button>
      <button class="baseBtn" id="comprar">Comprar</button>
    `;
    const vaciar = document.getElementById('vaciar-carrito');
    vaciar.addEventListener('click', () => {
      clearCart();
      render();
    });
    const comprar = document.getElementById('comprar');
    comprar.addEventListener('click', async () => {
      await buyProducts(productos);
      render();
    });
    const resume = document.getElementById('resume');
    resume.innerHTML = '';
    let totalProducts = 0;
    let totalPrice = 0;
    productos.forEach((prod) => {
      totalProducts += prod.cantidad;
      totalPrice += prod.precio * prod.cantidad;
    });
    resume.innerHTML = `
      Total de productos: ${totalProducts} Total a pagar: ${financialFormat({
      amount: totalPrice,
    })}
    `;
  } else {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '<h2>No hay productos en el carrito</h2>';
    const botones = document.getElementById('cartButtons');
    botones.innerHTML = '';
    const resume = document.getElementById('resume');
    resume.innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  header.appendChild(Header());
  logoutEvent();
  render();
});
