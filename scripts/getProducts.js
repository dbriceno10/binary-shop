const getProducts = async () => {
  const data = await fetch('./productos.json');
  const products = await data.json();
  return products;
};

export default getProducts;
