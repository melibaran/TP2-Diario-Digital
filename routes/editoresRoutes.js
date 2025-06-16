import express from 'express';
import {
    CrearEditor,
    getEditores,
    getEditoresById,
    editarDatos,
    getComentariosDeEditores
} from '../controllers/editoresController.js';

const router = express.Router();

router.post('/api/editores', CrearEditor);
router.get('/api/editores', getEditores);
router.get('/api/editores/:id', getEditoresById);
router.put('/api/editores/:id', editarDatos);
router.get('/api/editores/:id/comentarios', getComentariosDeEditores);
export default router;
