import express from 'express';
import {
    CrearComentario,
    getComentarios,
    getComentariosById
} from '../controllers/comentariosController.js'

const router = express.Router()


router.get('/api/comentarios', getComentarios)
router.post('/api/comentarios', CrearComentario)
router.get('/api/comentarios/:id', getComentariosById)



export default router