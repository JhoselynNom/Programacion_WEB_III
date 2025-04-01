const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdlb',
  connectionLimit: 10
});

const conexionPooling = async () => {
  console.time('Conexión con pooling');
  const [filas] = await pool.execute('SHOW TABLES');
  console.log(filas);
  console.timeEnd('Conexión con pooling');
  pool.end();
};

conexionPooling();