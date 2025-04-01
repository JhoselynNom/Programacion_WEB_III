const express = require('express');
const router = express.Router();
const conexion = require('../database/db'); 

router.get('/json', (req, res) => {
    conexion.query('SELECT * FROM libros', (error, resultados) => {
        if (error) {
            console.error('❌ Error al obtener libros:', error);
            res.status(500).json({ error: 'Error al obtener los libros' });
        } else {
            res.json(resultados); 
        }
    });
});

module.exports = router;