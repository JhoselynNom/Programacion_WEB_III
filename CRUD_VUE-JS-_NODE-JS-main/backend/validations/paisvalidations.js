exports.validarPais = (nombre, capital) => {
  const errores = [];
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
  if (!regex.test(nombre)) errores.push('Nombre del país inválido');
  if (!regex.test(capital)) errores.push('Capital del país inválida');
  return errores;
};
