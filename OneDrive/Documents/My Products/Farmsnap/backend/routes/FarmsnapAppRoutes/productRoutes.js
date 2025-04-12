import express from 'express'
import { createNewProduct, getAllProducts,deleteProduct, getAllCurrentUserProducts, updateProduct, getLimitProducts } from '../../controllers/FarmsnapAppControllers/productController.js'
import protectRoute from '../../middleware/protectRoute.js'
const router = express.Router()

router.post("/createProduct",protectRoute,createNewProduct)
router.get('/get-allProducts',getAllProducts)
router.get('/get-limitProducts',getLimitProducts)
router.get('/get-CurrentUserAllProducts',protectRoute,getAllCurrentUserProducts)
router.delete('/delete-product/:id',protectRoute,deleteProduct)
router.put('/update-product/:id',protectRoute,updateProduct)

export default router