import db from '../config/db.js'

export const getAll = async (req, res) => {
  try {

    const [rows] = await db.query('SELECT id_pais, nombre, capital, continente FROM pais')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al obtener países')
  }
}

export const create = async (req, res) => {
  try {
    const { nombre, capital, continente } = req.body
    if (!nombre || nombre.trim() === '') return res.status(400).json({ error: 'Nombre requerido' })


    await db.query('INSERT INTO pais (nombre, capital, continente) VALUES (?, ?, ?)', [nombre, capital, continente])
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al crear país')
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, capital, continente } = req.body
    if (!nombre || nombre.trim() === '') return res.status(400).json({ error: 'Nombre requerido' })

    await db.query('UPDATE pais SET nombre = ?, capital = ?, continente = ? WHERE id_pais = ?', [nombre, capital, continente, id])
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al actualizar país')
  }
}

export const deletePais = async (req, res) => {
  try {
    const { id } = req.params
    await db.query('DELETE FROM pais WHERE id_pais = ?', [id])
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al eliminar país')
  }
}

