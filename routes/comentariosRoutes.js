import express from 'express';

import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';
import {listarComentarios, getComentarios, CrearComentario, getComentariosById
} from '../controllers/comentariosController.js'

const router = express.Router()

router.get('/api/posts/:id/comentarios', listarComentarios);
router.post('/api/posts/:id/comentarios', protegerRuta, CrearComentario);

router.get('/api/comentarios', getComentarios)
router.get('/api/comentarios/:id', getComentariosById)



export default router