const mysql = require('mysql2/promise');

const getConnection = async () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: '',  
    database: 'testdlb',  
  });
};


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  
  password: '',  
  database: 'testdlb', 
  connectionLimit: 10, 
});

module.exports = {
  getConnection,
  pool
};