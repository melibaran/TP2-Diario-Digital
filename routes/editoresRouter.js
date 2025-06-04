import express from 'express';
import {
    CrearEditor,
    getEditores,
    getEditoresById,
} from '../controllers/editoresController.js'

const router = express.Router()


router.get('/api/comentarios', getEditores)
router.post('/api/comentarios', CrearEditor)
router.get('/api/comentarios/:id', getEditoresById)



export default router