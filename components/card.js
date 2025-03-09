import { truncateString } from '../scripts/utils.js';

const Card = (producto, textA = '', textB = '', isCart = '') => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.id = `producto${producto.id}`;
  const btnA = `<button id="actionA${producto.id}" class="baseBtn">${textA}</button>`;
  const btnB = ` <button id="comprar${producto.id}" class="baseBtn">${textB}</button>`;
  const cartBtns = `  <div class="cartButtons"><button class="baseBtn" id="removeToCard${producto.id}">-</button><button class="baseBtn" id="addToCard${producto.id}">+</button></div>`;
  div.innerHTML = `
   <div class="cardImage">
    <img src=${producto.imagen} alt=${producto.nombre} title=${producto.nombre}>
   </div>
   <div class="cardInfo">
    <h4>${producto.nombre}</h4>
    <p class="precioProducto">Precio: ${producto.precio}</p>
    <p class="precioProducto">Cantidad: ${producto.cantidad}</p>
    <p class="descripcion">${truncateString(producto.descripcion, 80)}</p>
   ${isCart && cartBtns}
    ${textA && btnA}
   ${textB && btnB}
   </div>
    `;
  return div;
};

export const addEventListenersActionA = (producto, actionA) => {
  const boton = document.getElementById(`actionA${producto.id}`);
  if (boton) {
    boton.addEventListener('click', () => {
      if (actionA && typeof actionA === 'function') {
        actionA(producto);
      }
    });
  }
};

export const addEventListenersActionB = (producto, actionB) => {
  const boton = document.getElementById(`comprar${producto.id}`);
  if (boton) {
    boton.addEventListener('click', () => {
      if (actionB && typeof actionB === 'function') {
        actionB(producto);
      }
    });
  }
};

export const addEventListenersAddToCard = (producto, action) => {
  const boton = document.getElementById(`addToCard${producto.id}`);
  if (boton) {
    boton.addEventListener('click', () => {
      if (action && typeof action === 'function') {
        action(producto);
      }
    });
  }
};

export const addEventListenersRemoveToCard = (producto, action) => {
  const boton = document.getElementById(`removeToCard${producto.id}`);
  if (boton) {
    boton.addEventListener('click', () => {
      if (action && typeof action === 'function') {
        action(producto);
      }
    });
  }
};

export default Card;
