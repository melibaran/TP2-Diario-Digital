import express from 'express';
import {
    CrearUsuario,
    getUsuarios,
    getUsuariosById,
    actualizarProfilePic,
    getUsuariosSearch,
//    login
} from '../controllers/usuariosController.js';
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router()

//router.post('/api/login', login);

router.get('/api/usuarios', getUsuarios)
router.post('/api/usuarios', protegerRuta, CrearUsuario);
router.get('/api/usuarios/:id', getUsuariosById)
router.put('/api/usuarios/actualizar', actualizarProfilePic)
router.get('/api/search/usuarios', getUsuariosSearch);

router.put('/api/usuarios', protegerRuta, allowUpload, actualizarProfilePic);

export default router