import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shipment : null
}
const shipmentSlice = createSlice({
    name : 'shipment',
    initialState,
    reducers : {
        setShipment : (state,action)=>{
            state.shipment = action.payload;
        }
    }
})

export const {setShipment} = shipmentSlice.actions
export default shipmentSlice.reducer
