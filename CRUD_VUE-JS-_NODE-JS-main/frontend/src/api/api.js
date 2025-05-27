import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Pais
export const getPaises = () => api.get('/paises')
export const addPais = (pais) => api.post('/paises', pais)
export const updatePais = (id, pais) => api.put(`/paises/${id}`, pais)
export const deletePais = (id) => api.delete(`/paises/${id}`)

// Ciudad
export const getCiudades = () => api.get('/ciudades')
export const addCiudad = (ciudad) => api.post('/ciudades', ciudad)
export const updateCiudad = (id, ciudad) => api.put(`/ciudades/${id}`, ciudad)
export const deleteCiudad = (id) => api.delete(`/ciudades/${id}`)
