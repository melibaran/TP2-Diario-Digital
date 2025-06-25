import express from 'express';
import {
    getNotas,
    getNotasById,
    crearNota,
} from '../controllers/notasController.js';
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowMultipleUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router()

// Crear notas (con imágenes, protegido)
router.post('/api/notas', protegerRuta, allowMultipleUpload, crearNota);

// Obtener todos las notas
router.get('/api/notas', getNotas);

// Obtener una nota por ID
router.get('/api/notas/:id', getNotasById)




export default router