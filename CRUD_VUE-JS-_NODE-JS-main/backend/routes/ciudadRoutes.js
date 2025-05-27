import express from 'express'
import * as ciudadController from '../controllers/ciudadController.js'

const router = express.Router()

router.get('/', ciudadController.getAll)
router.post('/', ciudadController.create)
router.put('/:id', ciudadController.update)
router.delete('/:id', ciudadController.deleteCiudad)

export default router
