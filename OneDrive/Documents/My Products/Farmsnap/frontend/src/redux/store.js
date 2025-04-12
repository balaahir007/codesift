import {configureStore} from '@reduxjs/toolkit'
import productReducer from './FarmsnapAppRedux/product/productSlice.js'
import CurrentUserproductReducer from './FarmsnapAppRedux/product/CurrentUserProducts.js'
import shipmentReducer from './FarmsnapAppRedux/shipment/shipmentSlice.js'

const store = configureStore({
    reducer : {
        product : productReducer,
        CurrentUserProduct : CurrentUserproductReducer,
        shipment : shipmentReducer
    }
})
export default store