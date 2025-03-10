export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

export const validatePassword = (password, password2) => {
  const length = new RegExp('(?=.{8,})');
  const number = new RegExp(/[0-9]/);
  const upper = new RegExp(/[A-Z]/);
  const lower = new RegExp(/[a-z]/);
  const special = new RegExp(/[^\w]/);
  if (!length.test(password)) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!number.test(password)) {
    return 'La contraseña debe tener al menos un número';
  }
  if (!upper.test(password)) {
    return 'La contraseña debe tener al menos una letra mayúscula';
  }
  if (!lower.test(password)) {
    return 'La contraseña debe tener al menos una letra minúscula';
  }
  if (!special.test(password)) {
    return 'La contraseña debe tener al menos un caracter especial';
  }
  if (password !== password2) {
    return 'Las contraseñas no coinciden';
  }
  return '';
};

export const validateProduct = (product) => {
  const length = new RegExp('(?=.{8,})');
  if (!length.test(product.nombre)) {
    return 'El nombre del producto debe tener al menos 8 caracteres';
  } else if (!length.test(product.descripcion)) {
    return 'La descripción del producto debe tener al menos 8 caracteres';
  } else if (product.precio <= 0) {
    return 'El precio del producto debe ser mayor a 0';
  } else if (product.cantidad <= 0) {
    return 'La cantidad del producto debe ser mayor a 0';
  } else if (!product.imagen) {
    return 'El producto debe tener una imagen';
  }
  return '';
};

export const financialFormat = ({
  amount,
  format = 'en-US',
  style = 'currency',
  currency = 'USD',
  maximumFractionDigits = 2,
}) => {
  return new Intl.NumberFormat(format, {
    style,
    currency,
    maximumFractionDigits,
  }).format(amount);
};
