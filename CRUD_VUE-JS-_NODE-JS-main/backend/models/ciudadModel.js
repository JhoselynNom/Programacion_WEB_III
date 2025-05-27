import db from '../config/db.js'

export const getAllCiudades = async () => {
  const [rows] = await db.query('SELECT id_ciudad, nombre, poblacion, region FROM ciudad')
  return rows
}

export const createCiudad = async ({ nombre, poblacion, region }) => {
  await db.query(
    'INSERT INTO ciudad (nombre, poblacion, region) VALUES (?, ?, ?)',
    [nombre, poblacion, region]
  )
}

export const updateCiudad = async (id, { nombre, poblacion, region }) => {
  await db.query(
    'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ? WHERE id_ciudad = ?',
    [nombre, poblacion, region, id]
  )
}

export const deleteCiudad = async (id) => {
  await db.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id])
}
