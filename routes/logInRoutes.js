import express from 'express';
import {
    login,
    logout,
} from '../controllers/logInController.js'

const router = express.Router()


router.post('/api/login', login)
router.post('/api/logout', logout)


export default router