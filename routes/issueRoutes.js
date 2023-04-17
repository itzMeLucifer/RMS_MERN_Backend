import express from 'express'
import {issueController} from '../controllers/issueController.js'
import { auth } from '../middleware/auth.js'
const router =  express.Router()

router.get('/:id', auth, issueController.getIssues)

export default router