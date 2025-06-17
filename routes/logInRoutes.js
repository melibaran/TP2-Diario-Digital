import express from 'express';
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { login, refreshToken, logout 
} from '../controllers/logInController.js'

const router = express.Router()


router.post('/api/login', login)
router.post('/api/refresh', protegerRuta, refreshToken); 
router.post('/api/logout', protegerRuta, logout)


export default router