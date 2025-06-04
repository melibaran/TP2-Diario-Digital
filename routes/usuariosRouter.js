import express from 'express';
import {
    CrearUsuario,
    getUsuarios,
    getUsuariosById,
} from '../controllers/usuariosController.js'

const router = express.Router()


router.get('/api/usuarios', getUsuarios)
router.post('/api/usuarios', CrearUsuario)
router.get('/api/usuarios/:id', getUsuariosById)



export default router