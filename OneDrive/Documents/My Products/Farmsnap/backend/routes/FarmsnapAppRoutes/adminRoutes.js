import express from 'express'
import { adminProductApproval, getAllProductsForAdminPannel, getAllUser, userAdminOrGeneralChange } from '../../controllers/FarmsnapAppControllers/adminController.js'
import protectRoute from '../../middleware/protectRoute.js'
const router = express.Router()

router.post('/getAll-users',protectRoute,getAllUser)
router.get('/get-allProductsForAdminPannel',getAllProductsForAdminPannel)
router.post('/approved-product/:id',protectRoute,adminProductApproval)
router.post('/user-AdminOrGenaralChange',userAdminOrGeneralChange)

export default router