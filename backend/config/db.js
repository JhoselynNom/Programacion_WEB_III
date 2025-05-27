const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'bd_tienda_product.sql'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conexión a la base de datos MySQL exitosa');
});

module.exports = db;

