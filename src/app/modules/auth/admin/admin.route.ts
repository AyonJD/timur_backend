import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.post('/signup', AdminController.createAdmin)
router.post('/login', AdminController.loginAdmin)

export const AdminRoute = router
