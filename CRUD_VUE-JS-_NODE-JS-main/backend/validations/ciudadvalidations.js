exports.validarCiudad = (nombre, region) => {
  const errores = [];
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
  const regexRegion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;
  if (!regexNombre.test(nombre)) errores.push('Nombre de ciudad inválido');
  if (!regexRegion.test(region)) errores.push('Región inválida');
  return errores;
};
