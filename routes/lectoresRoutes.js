import express from 'express';
import {
    CrearLector,
    getLectores,
    getLectoresById,
} from '../controllers/lectoresController.js'

const router = express.Router()


router.get('/api/lectores', getLectores)
router.post('/api/lectores', CrearLector)
router.get('/api/notas/:id', getLectoresById)



export default router