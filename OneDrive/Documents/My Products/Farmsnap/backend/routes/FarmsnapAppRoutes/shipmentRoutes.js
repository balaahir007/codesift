import express from 'express'
import protectRoute from '../../middleware/protectRoute.js'
import { createShipment } from '../../controllers/FarmsnapAppControllers/shipmentControllers.js'
const router = express.Router()

router.post('/createNew-shipment',protectRoute,createShipment)
export default router