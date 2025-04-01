const mysql = require('mysql2');


const conexionBasica = () => {
  console.time('Conexión básica');
  
  
  const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'testdlb'  
  });

  
  conexion.connect((err) => {
    if (err) {
      console.error('Error en la conexión:', err);
      return;
    }
    
    console.log('Conexión básica establecida');
    
    
    conexion.query('SHOW TABLES', (err, rows) => {
      if (err) {
        console.error('Error en la consulta:', err);
      } else {
        console.log('Tablas en la base de datos:', rows);
      }

    
      conexion.end();
      
      console.timeEnd('Conexión básica');
    });
  });
};


conexionBasica();