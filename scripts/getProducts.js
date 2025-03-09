const getProducts = async () => {
  const data = await fetch('../json/productos.json');
  const products = await data.json();
  return products;
};

export default getProducts;
