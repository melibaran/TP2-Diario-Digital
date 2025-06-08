import express from 'express';
import {
    CrearLector,
    getLectores,
    getLectoresById,
    editarDatos
} from '../controllers/lectoresController.js'

const router = express.Router()


router.get('/api/lectores', getLectores)
router.post('/api/lectores', CrearLector)
router.get('/api/lectores/:id', getLectoresById)
router.put('/api/editores/:id', editarDatos);



export default router