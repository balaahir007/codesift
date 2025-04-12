import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product : null
}
const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
        setAllProduct : (state,action)=>{
            state.product = action.payload;
        }
    }
})

export const {setAllProduct} = productSlice.actions
export default productSlice.reducer
