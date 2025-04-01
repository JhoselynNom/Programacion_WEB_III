const mysql = require('mysql2');
require('dotenv').config();

// Configuracion de la conexion a MySQL
const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'biblioteca'
});

conexion.connect(err => {
    if (err) throw err;
    console.log('Conexión establecida con MySQL');
    
    conexion.query('SHOW TABLES', (err, results) => {
      if (err) throw err;
      console.log('Tablas disponibles:', results);
    });
  });
  
  module.exports = conexion;

