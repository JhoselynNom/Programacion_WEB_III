const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Configuracioon de la conexion a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '', 
  database: 'biblioteca'  
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Configuramos la carpeta 'views' donde estarán las vistas

// Middleware para servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 

// listado de libros
app.get('/', (req, res) => {
  // Obtenemos los libros de la base de datos
  connection.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      console.error('Error al obtener libros:', err);
      return res.status(500).send('Error al obtener libros');
    }

    res.render('libro/index', { libros: results });
  });
});

// Ruta para la página de creación de un libro
app.get('/libros/crear', (req, res) => {
  res.render('libro/crear'); 
});

// guardar el libro
app.post('/libros/crear', (req, res) => {
  const { titulo, autor, anio } = req.body; // Extrae los datos del formulario

  const query = 'INSERT INTO libros (titulo, autor, anio) VALUES (?, ?, ?)';
  connection.query(query, [titulo, autor, anio], (err, results) => {
    if (err) {
      console.error('Error al crear el libro:', err);
      return res.status(500).send('Error al crear el libro');
    }
  
    res.redirect('/');
  });
});

// Ruta para editar un libro
app.get('/libros/:id/editar', (req, res) => {
  const libroId = req.params.id; // Obtiene el ID del libro desde la URL

  // Busca el libro por su ID
  connection.query('SELECT * FROM libros WHERE id = ?', [libroId], (err, results) => {
    if (err) {
      console.error('Error al obtener el libro:', err);
      return res.status(500).send('Error al obtener el libro');
    }

    // Si no se encuentra el libro, mostrar un error 404
    if (results.length === 0) {
      return res.status(404).send('Libro no encontrado');
    }

    const libro = results[0]; 
    res.render('libro/editar', { libro }); 
  });
});

// Ruta para actualizar el libro
app.post('/libros/:id/actualizar', (req, res) => {
  const libroId = req.params.id; // ID del libro desde la URL
  const { titulo, autor, anio } = req.body; // Obtiene los datos del formulario

  const query = 'UPDATE libros SET titulo = ?, autor = ?, anio = ? WHERE id = ?';
  connection.query(query, [titulo, autor, anio, libroId], (err, results) => {
    if (err) {
      console.error('Error al actualizar el libro:', err);
      return res.status(500).send('Error al actualizar el libro');
    }

    // Redirige al listado de libros después de actualizar
    res.redirect('/');
  });
});

// eliminar un libro
app.post('/libros/:id/eliminar', (req, res) => {
  const libroId = req.params.id; // Obtiene el ID del libro desde la URL

  const query = 'DELETE FROM libros WHERE id = ?';
  connection.query(query, [libroId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el libro:', err);
      return res.status(500).send('Error al eliminar el libro');
    }

    // Redirige al listado de libros despues de eliminar uno
    res.redirect('/');
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
