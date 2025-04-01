const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',     // Servidor de MySQL 
    user: 'root',         // Usuario de MySQL 
    password: '',         // Contraseña 
    database: 'biblioteca' // Nombre de mi base de datos
});

// Conectar a MySQL
conexion.connect((error) => {
    if (error) {
        console.error('❌ Error de conexión a MySQL:', error);
        return;
    }
    console.log('✅ Conexión a MySQL establecida');
});

module.exports = conexion;
