import { getProducts } from './dao.js';
import CardContainer from '../components/cardContainer.js';
import Header from '../components/header.js';

const user = JSON.parse(localStorage.getItem('user'));

if(!user) {
  window.location.href = '/login.html';
} 

let productos = await getProducts();

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');

// let carrito = [];
// JSON
// document.addEventListener('DOMContentLoaded', () => {
//   if (localStorage.getItem('carrito')) {
//     carrito = JSON.parse(localStorage.getItem('carrito'));
//     actualizarCarrito();
//   }
// });

// botonVaciar.addEventListener('click', () => {
//   carrito.length = 0;
//   actualizarCarrito();
// });

//AGREGO AL CARRITO
const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }

  actualizarCarrito();
};

// const eliminarDelCarrito = (prodId) => {
//   const item = carrito.find((prod) => prod.id === prodId);

//   const indice = carrito.indexOf(item);

//   carrito.splice(indice, 1);

//   actualizarCarrito();
//   console.log(carrito);
// };

// const actualizarCarrito = () => {
//   //APPENDS SE ACUMULAN
//   contenedorCarrito.innerHTML = '';

//   carrito.forEach((prod) => {
//     const div = document.createElement('div');
//     div.className = 'productoEnCarrito';
//     div.innerHTML = `
//         <p>${prod.nombre}</p>
//         <p>Precio:$${prod.precio}</p>
//         <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
//         <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
//         `;

//     contenedorCarrito.appendChild(div);

//     localStorage.setItem('carrito', JSON.stringify(carrito));
//   });

//   contadorCarrito.innerText = carrito.length; // actualiza con la longitud del carrito
//   precioTotal.innerText = carrito.reduce(
//     (acc, prod) => acc + prod.cantidad * prod.precio,
//     0
//   );
// };

//EL HTML
const header = document.getElementById('header');
header.appendChild(Header());

CardContainer(productos, agregarAlCarrito);
