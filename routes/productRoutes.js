import express from 'express'
import {productController} from '../controllers/productController.js'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, productController.getProducts)

export default router