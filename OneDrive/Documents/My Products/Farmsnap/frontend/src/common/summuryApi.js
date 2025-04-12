const BASE_URL = import .meta.filename.MODE  === 'development' ? 'http://localhost:8000' : '/'
const summuryApi = {
    login : `${BASE_URL}/api/auth/login`,
    register : `${BASE_URL}/api/auth/signup`,
    logout : `${BASE_URL}/api/auth/logout`,
    checkAuth : `${BASE_URL}/api/auth/check-auth`,
    updateProfilePic : `${BASE_URL}/api/auth/update-profile`,


    uploadNewProduct : `${BASE_URL}/api/product/createProduct`,
    getAllProducts : `${BASE_URL}/api/product/get-allProducts`,
    getLimitProducts : `${BASE_URL}/api/product/get-limitProducts`,
    getAllCurrentUserProducts : `${BASE_URL}/api/product/get-CurrentUserAllProducts`,
    deleteProductsById :  `${BASE_URL}/api/product/delete-product`,
    updateProductsById :  `${BASE_URL}/api/product/update-product`,
    
    getAllProductsForAdminPannel : `${BASE_URL}/api/admin/get-allProductsForAdminPannel`,
    adminProductApproval :  `${BASE_URL}/api/admin/approved-product`,
    GetAllUsersByAdmin : `${BASE_URL}/api/admin/getAll-users`,
    changeUserAdminOrGenaral : `${BASE_URL}/api/admin/user-AdminOrGenaralChange`,
    
    addToCartProduct : `${BASE_URL}/api/cart/addTo-cart`,
    getAllCartProduct : `${BASE_URL}/api/cart/get-AllCartProducts`,
    deleteCartProduct : `${BASE_URL}/api/cart/deleteCartProduct`,
    
    chatBotMessageSend : `${BASE_URL}/api/chatbot/sendMessage`,

    createNewShipment : `${BASE_URL}/api/shipment/createNew-shipment`,
    farmerRequest  : `${BASE_URL}/api/auth/add-request`,
}
export default summuryApi

