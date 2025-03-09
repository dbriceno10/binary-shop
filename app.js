import getProducts from './getProducts.js';
let productos = await getProducts();

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');

let carrito = [];
//JSON
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
});

//EL HTML
// <p class="descripcion">${producto.desc}</p>
// <p>Contenido: ${producto.contenido}</p>
productos.forEach((producto) => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src=${
      producto.imagen ??
      'https://images.ctfassets.net/t2436bmmnhys/3neQp23OKVECWA0RpgfoaE/b4a16575ea5c9a919837a31db91e0ba4/file.png?fm=webp&q=85'
    } alt= "">
    <h3>${producto.nombre}</h3>

    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${
      producto.id
    }" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `;
  contenedorProductos.appendChild(div);

  //DOM:
  const boton = document.getElementById(`agregar${producto.id}`);

  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
    //
  });
});

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

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);

  actualizarCarrito();
  console.log(carrito);
};

const actualizarCarrito = () => {
  //APPENDS SE ACUMULAN
  contenedorCarrito.innerHTML = '';

  carrito.forEach((prod) => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem('carrito', JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length; // actualiza con la longitud del carrito

  console.log(carrito);
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};
