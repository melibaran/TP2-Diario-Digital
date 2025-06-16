import express from 'express';
import {
    login,
} from '../controllers/logInController.js'

const router = express.Router()


router.post('/api/login', login)



export default router