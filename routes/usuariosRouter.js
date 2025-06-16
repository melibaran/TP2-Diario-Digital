import express from 'express';
import {
    CrearUsuario,
    getUsuarios,
    getUsuariosById,
    actualizarProfilePic,
    getUsuariosSearch,
} from '../controllers/usuariosController.js'

const router = express.Router()


router.get('/api/usuarios', getUsuarios)
router.post('/api/usuarios', CrearUsuario)
router.get('/api/usuarios/:id', getUsuariosById)
router.get('/api/usuarios/pla', getUsuariosSearch)
router.put('/api/usuarios/actualizar', actualizarProfilePic)



export default router