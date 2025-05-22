import express from 'express';
import {
    CrearComentario,
    getComentarios,
} from '../controllers/comentariosController.js'

const router = express.Router()


router.get('/api/comentarios', getComentarios)
router.post('/api/comentarios', CrearComentario)



export default router