import express from 'express';
import {
    CrearUsuario,
    getUsuarios,
    getUsuariosById,
} from '../controllers/usuariosController.js'

const router = express.Router()


router.get('/api/comentarios', getUsuarios)
router.post('/api/comentarios', CrearUsuario)
router.get('/api/comentarios/:id', getUsuariosById)



export default router