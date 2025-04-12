import express from 'express'
import protectRoute from '../../middleware/protectRoute.js'
import { addToCartProduct, deleteCartProduct, getAllCartProduct } from '../../controllers/FarmsnapAppControllers/cartProductControllers.js'
const router = express.Router()

router.post('/addTo-cart',protectRoute,addToCartProduct)
router.get('/get-AllCartProducts',protectRoute,getAllCartProduct)
router.delete('/deleteCartProduct/:productId',protectRoute,deleteCartProduct)

export default router;