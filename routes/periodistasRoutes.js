import express from 'express';
import {
    CrearPeriodista,
    getPeriodistas,
    getPeriodistaById,
    getNotasByPeriodista
} from '../controllers/periodistasController.js';

const router = express.Router();

router.post('/api/periodistas', CrearPeriodista);
router.get('/api/periodistas', getPeriodistas);
router.get('/api/periodistas/:id', getPeriodistaById);
router.get('/api/periodistas/:id/notas', getNotasByPeriodista);

export default router;
