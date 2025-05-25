import express from 'express';
import {
    CrearEditor,
    getEditores,
    getEditoresById
} from '../controllers/editoresController';

const router = express.Router();

router.post('/api/editores', CrearEditor);
router.get('/api/editores', getEditores);
router.get('/api/editores/:id', getEditoresById);

export default router;
