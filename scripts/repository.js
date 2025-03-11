import { getUsers, findUser, getProducts, getCart } from './dao.js';

export const registerUser = async (user) => {
  const users = await getUsers();
  const userExists = await findUser(user.username);
  if (userExists) {
    alert('El usuario ya esta registrado');
    return false;
  } else {
    user.id = new Date().getTime();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
};

export const addProductToCard = (product) => {
  let products = [];
  const auxProduct = { ...product };
  if (!localStorage.getItem('carrito')) {
    auxProduct.cantidad = 1;
    products.push(auxProduct);
    localStorage.setItem('carrito', JSON.stringify(products));
    alert('Producto agregado al carrito');
  } else {
    products = JSON.parse(localStorage.getItem('carrito'));
    const findIndex = products?.findIndex((prod) => prod.id === auxProduct.id);
    if (findIndex !== -1) {
      if (products[findIndex].cantidad + 1 > product.cantidad) {
        alert('No hay suficiente stock');
      } else {
        products[findIndex].cantidad++;
        localStorage.setItem('carrito', JSON.stringify(products));
        alert('Producto agregado al carrito');
      }
    } else {
      auxProduct.cantidad = 1;
      products.push(auxProduct);
      localStorage.setItem('carrito', JSON.stringify(products));
      alert('Producto agregado al carrito');
    }
  }
  return products;
};

export const addProduct = async (product) => {
  const productos = await getProducts();
  const cartProducts = getCart();
  const producto = productos?.find((prod) => prod.id === product.id);
  const index = cartProducts?.findIndex((prod) => prod.id === product.id);
  if (cartProducts[index].cantidad + 1 > producto.cantidad) {
    alert('No hay suficiente stock');
  } else {
    cartProducts[index].cantidad++;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
  }
};

export const removeProduct = (product) => {
  const cartProducts = getCart();
  const index = cartProducts?.findIndex((prod) => prod.id === product.id);
  if (cartProducts[index].cantidad <= 1) {
    localStorage.setItem(
      'carrito',
      JSON.stringify(cartProducts?.filter((prod) => prod.id !== product.id))
    );
  } else {
    cartProducts[index].cantidad--;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
  }
};

export const removeProducts = (product) => {
  const isConfirmed = confirm(
    '¿Estás seguro de eliminar el producto del carrito?'
  );
  if (isConfirmed) {
    localStorage.setItem(
      'carrito',
      JSON.stringify(getCart().filter((prod) => prod.id !== product.id))
    );
  }
};

export const clearCart = () => {
  const isConfirmed = confirm('¿Estás seguro de vaciar el carrito?');
  if (isConfirmed) {
    localStorage.removeItem('carrito');
  }
};

export const buyProduct = async (product) => {
  const isConfirmed = confirm('¿Estás seguro de comprar el producto?');
  if (isConfirmed) {
    const products = await getProducts();
    const prod = products.find((prod) => prod.id === product.id);
    if (product.cantidad >= 1) {
      prod.cantidad--;
    } else {
      prod.cantidad = 0;
    }
    localStorage.setItem('products', JSON.stringify(products));
    alert(
      'Su compra se ha cargado a su tarjeta de credito exitosamente, gracias por su compra'
    );
  }
};

export const buyProducts = async (cartProducts) => {
  const isConfirmed = confirm('¿Estás seguro de comprar los productos?');
  if (isConfirmed) {
    const products = await getProducts();
    cartProducts.forEach((prod) => {
      const product = products.find((product) => product.id === prod.id);
      const newQty = product.cantidad - prod.cantidad;
      if (newQty <= 0) {
        product.cantidad = 0;
      } else {
        product.cantidad = newQty;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.removeItem('carrito');
    alert(
      'Su compra se ha cargado a su tarjeta de credito exitosamente, gracias por su compra'
    );
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('carrito');
  window.location.href = '/binary-shop/login.html';
};

export const createProduct = async (product, user) => {
  const products = await getProducts();
  product.id = new Date().getTime();
  product.sellerId = user.id;
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  alert('Producto creado exitosamente');
  return true;
};

export const deleteProduct = async (product) => {
  const isConfirmed = confirm('¿Estás seguro de eliminar el producto?');
  if (isConfirmed) {
    const products = await getProducts();
    localStorage.setItem(
      'products',
      JSON.stringify(products.filter((prod) => prod.id !== product.id))
    );
    alert('Producto eliminado exitosamente');
  }
};

export const deleteUser = async (user) => {
  const isConfirmed = confirm('¿Estás seguro de eliminar el usuario?');
  if (isConfirmed) {
    const users = await getUsers();
    localStorage.setItem(
      'users',
      JSON.stringify(users.filter((usr) => usr.id !== user.id))
    );
    alert('Usuario eliminado exitosamente');
  }
};

export const updateUser = async (user) => {
  const users = await getUsers();
  const index = users.findIndex((usr) => usr.id === user.id);
  const password = users[index].password;
  users[index] = { ...user, password };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(user));
  alert('Usuario actualizado exitosamente');
};
