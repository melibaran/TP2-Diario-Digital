import express from 'express';
import { protegerRuta } from '../middlewares/uploadMiddleware.js';
import { allowUpload } from '../middlewares/multer.js';
import { login, refreshToken, logout 
} from '../controllers/logInController.js'

const router = express.Router()


router.post('/api/login', login)
router.post('/api/refresh', refreshToken); 
router.post('/api/logout', logout)


export default router