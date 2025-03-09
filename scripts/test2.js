const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const filePath = path.join(__dirname, '../database/productos.json');

// Leer el archivo JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Parsear el contenido del archivo JSON
  let productos = JSON.parse(data);

  // Agregar un id a cada elemento
  productos = productos.map((producto, index) => {
    if (index > productos.length / 2) {
      return {
        sellerId: 4,
        ...producto,
      };
    } else {
      return {
        sellerId: 3,
        ...producto,
      };
    }
  });

  // Convertir el objeto de vuelta a JSON
  const jsonString = JSON.stringify(productos, null, 2);

  // Guardar los cambios en el archivo JSON
  fs.writeFile(filePath, jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return;
    }
    console.log('Archivo JSON actualizado correctamente.');
  });
});
