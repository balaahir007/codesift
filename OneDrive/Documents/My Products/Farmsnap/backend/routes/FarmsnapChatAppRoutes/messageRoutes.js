import express from 'express'
import { getMessages, getUsersForSidebar, sendMessage } from '../../controllers/FarmsnapChatAppControllers/chatAppUserControllers.js'
import protectRoute from '../../middleware/protectRoute.js'
const router = express.Router()

router.get('/users',protectRoute,getUsersForSidebar)
router.get('/:id',protectRoute,getMessages)
 
router.post('/send/:id',protectRoute,sendMessage)


export default router