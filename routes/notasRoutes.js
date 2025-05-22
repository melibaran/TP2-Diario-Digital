import express from 'express';
import {
    home,
    getNotas,
    getNotasById,
    CrearNota,
} from '../controllers/notasController.js'

const router = express.Router()


router.get('/', home)
router.get('/api/notas', getNotas)
router.get('/api/notas/:id', getNotasById)
router.post('/api/notas', CrearNota)


export default router