const mysql = require('mysql2/promise');

// Función para la conexión utilizando promesas
const conexionPromesas = async () => {
  console.time('Conexión con promesas');
  
  try {
    
    const conexion = await mysql.createConnection({
      host: 'localhost',
      user: 'root',  // Reemplaza con tu usuario
      password: '',  // Reemplaza con tu contraseña
      database: 'testdlb'  // Reemplaza con tu base de datos
    });

    console.log('Conexión con promesas establecida');

    // Ejecutar la consulta para obtener las tablas
    const [filas] = await conexion.execute('SHOW TABLES');
    console.log('Tablas en la base de datos:', filas);
    
    // Cerrar la conexión
    await conexion.end();

    console.timeEnd('Conexión con promesas');
  } catch (error) {
    console.error('Error en la conexión o consulta:', error);
  }
};

// Llamar a la función de conexión con promesas
conexionPromesas();