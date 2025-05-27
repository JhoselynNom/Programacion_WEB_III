import db from '../config/db.js'

export const getAllPaises = async () => {
  const [rows] = await db.query('SELECT id_pais, nombre FROM pais')
  return rows
}


export const createPais = async (nombre) => {
  await db.query('INSERT INTO pais (nombre) VALUES (?)', [nombre])
}


export const updatePais = async (id, nombre) => {
  await db.query('UPDATE pais SET nombre = ? WHERE id_pais = ?', [nombre, id])
}


export const deletePais = async (id) => {
  await db.query('DELETE FROM pais WHERE id_pais = ?', [id])
}
