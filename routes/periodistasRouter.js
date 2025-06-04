import express from 'express';
import {
    getPeriodistas,
    getPeriodistasById,
    CrearPeriodista
} from '../controllers/periodistasController.js'

const router = express.Router()


router.get('/api/comentarios', getPeriodistas)
router.post('/api/comentarios', CrearPeriodista)
router.get('/api/comentarios/:id', getPeriodistasById)



export default router