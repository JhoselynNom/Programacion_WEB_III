exports.index = (req, res) => {
    conexion.query('SELECT * FROM libros', (err, libros) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).render('error', { 
                message: 'Error al cargar libros',
                error: err 
            });
        }

        console.log(' Libros encontrados:', libros.length);
        console.log(' Ruta vista:', path.join(__dirname, '../views/libros/index.ejs'));
        
        res.render('libros/index', { 
            title: 'Listado de Libros',
            libros: libros 
        });
    });
};