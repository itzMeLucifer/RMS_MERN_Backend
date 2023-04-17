import express from 'express'
import {authController} from '../controllers/authController.js'

const router = express.Router()

router.get('/',authController.defaultPath)
router.post('/login',authController.logIn)

export default router