import express from 'express'
import * as paisController from '../controllers/paisController.js'

const router = express.Router()

router.get('/', paisController.getAll)
router.post('/', paisController.create)
router.put('/:id', paisController.update)
router.delete('/:id', paisController.deletePais)

export default router
