import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configura la conexión MySQL (ajusta usuario, contraseña, bd)
const conexion = await mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_basededatos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ENDPOINT para obtener todos los países
app.get('/paises', async (req, res) => {
  try {
    const [rows] = await conexion.query('SELECT id_pais, nombre, capital, continente FROM pais');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener países' });
  }
});

// ENDPOINT para obtener todas las ciudades con datos del país anidado
app.get('/ciudades', async (req, res) => {
  try {
    const [rows] = await conexion.query(`
      SELECT c.id_ciudad, c.nombre AS nombre_ciudad, c.poblacion, c.region,
             p.id_pais, p.nombre AS nombre_pais, p.capital, p.continente
      FROM ciudad c
      JOIN pais p ON c.id_pais = p.id_pais
    `);

    // Mapeamos para anidar país dentro de ciudad
    const ciudades = rows.map(row => ({
      id_ciudad: row.id_ciudad,
      nombre: row.nombre_ciudad,
      poblacion: row.poblacion,
      region: row.region,
      pais: {
        id_pais: row.id_pais,
        nombre: row.nombre_pais,
        capital: row.capital,
        continente: row.continente
      }
    }));

    res.json(ciudades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener ciudades' });
  }
});

// ENDPOINTS para agregar, actualizar y eliminar países y ciudades 
// (agrega según tu lógica, aquí te dejo solo los get para mostrar)

// Levantamos servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
