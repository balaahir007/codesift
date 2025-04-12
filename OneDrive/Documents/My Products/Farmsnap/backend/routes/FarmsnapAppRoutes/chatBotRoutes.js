import express from 'express'
import { createChatBotResponse } from '../../controllers/FarmsnapAppControllers/ChatBotControllers.js'
const router = express.Router()

router.post('/sendMessage',createChatBotResponse)


export default router