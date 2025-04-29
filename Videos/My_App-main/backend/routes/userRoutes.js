const express = require('express');
const router = express.Router();
const {loginUser,logoutUser,registerUser}  = require('../controllers/userControllers');
const { createOrUpdateProducts } = require('../controllers/productControllers');

router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)


router.post('/create-product',createOrUpdateProducts)

module.exports = router
