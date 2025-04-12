import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    CurrentUserproduct : null
}
const productSlice = createSlice({
    name : 'CurrentUserproduct',
    initialState,
    reducers : {
        setCurrentUserAllProduct : (state,action)=>{
            state.CurrentUserproduct = action.payload;
        },
        updateProductInState: (state,action)=>{
                    const updatedProduct = action.payload;
                    state.CurrentUserproduct = state.CurrentUserproduct.map((item)=>
                        item._id === updatedProduct._id ? {...item,...updatedProduct} : item
                    )
        }
    }
})

export const {setCurrentUserAllProduct,updateProductInState} = productSlice.actions
export default productSlice.reducer
