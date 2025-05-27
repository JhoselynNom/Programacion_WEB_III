import db from '../config/db.js'


export const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id_ciudad, nombre, poblacion, region
      FROM ciudad
    `)
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al obtener ciudades')
  }
}

// Crear ciudad
export const create = async (req, res) => {
  try {
    const { nombre, poblacion, region, id_pais } = req.body
    if (!nombre || !poblacion || !region || !id_pais) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    await db.query(
      'INSERT INTO ciudad (nombre, poblacion, region, id_pais) VALUES (?, ?, ?, ?)',
      [nombre, poblacion, region, id_pais]
    )
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al crear ciudad')
  }
}

// Actualizar ciudad 
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, poblacion, region } = req.body

    await db.query(
      'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ? WHERE id_ciudad = ?',
      [nombre, poblacion, region, id]
    )
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al actualizar ciudad')
  }
}

// Eliminar ciudad
export const deleteCiudad = async (req, res) => {
  try {
    const { id } = req.params
    await db.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id])
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al eliminar ciudad')
  }
}



