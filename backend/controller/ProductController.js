const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  db.query('INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
    [nombre, descripcion, precio],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, nombre, descripcion, precio });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio } = req.body;
  db.query('UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
    [nombre, descripcion, precio, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Producto actualizado' });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto eliminado' });
  });
};
