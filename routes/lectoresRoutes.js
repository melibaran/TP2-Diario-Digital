import express from 'express';
import {
    CrearLector,
    getLectores,
} from '../controllers/lectoresController.js'

const router = express.Router()


router.get('/api/lectores', getLectores)
router.post('/api/lectores', CrearLector)


export default router