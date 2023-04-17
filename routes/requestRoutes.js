import express  from "express";
import {requestController} from '../controllers/requestController.js'
import { auth } from "../middleware/auth.js";
const router = express.Router()

router.get('/getmyrequests/:id',auth,requestController.getMyRequests)
router.get('/getemployeerequests/:id',auth,requestController.getEmployeeRequests)
router.get('/get/:id',auth, requestController.getInfo)
router.get('/get/admin/:id',auth, requestController.getInfoForAdmin)
router.put('/update', auth, requestController.updateRequest)
router.post('/create',auth, requestController.createRequest)
router.get('/getallrequests',auth,requestController.getAllRequests)

export default router