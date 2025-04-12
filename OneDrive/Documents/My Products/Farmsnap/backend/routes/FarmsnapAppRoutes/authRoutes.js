import express from 'express'
import { addRequestController, loginController, registerController,logoutController,profileImageUpload, checkAuth } from '../../controllers/FarmsnapAppControllers/authControllers.js';
import protectRoute from '../../middleware/protectRoute.js'
const router = express.Router()

router.post('/signup',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.put('/update-profile',protectRoute,profileImageUpload)
router.get('/check-auth',protectRoute,checkAuth)

// router.post('/add-request',protectRoute,addRequestController)
export default router;