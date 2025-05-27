import express from 'express'
import cors from 'cors'
import paisRoutes from './routes/paisRoutes.js'
import ciudadRoutes from './routes/ciudadRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/paises', paisRoutes)
app.use('/api/ciudades', ciudadRoutes)

app.listen(3000, () => {
  console.log('Servidor backend escuchando en http://localhost:3000')
})
