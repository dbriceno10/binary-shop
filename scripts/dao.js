export const getProducts = async () => {
  const data = await fetch('../database/productos.json');
  const products = await data.json();
  return products;
};

export const getUsers = async () => {
  const response = await fetch('../database/usuarios.json');
  const users = await response.json();
  return users;
};

export const loginUser = async (username, password) => {
  const users = await getUsers();
  const user = users.find(
    (user) =>
      (user.username === username || user.email === username) &&
      user.password === password
  );
  if (user) {
    const { password, ...rest } = user;
    return rest;
  } else {
    alert('Usuario o contraseña incorrectos');
    return null;
  }
};
