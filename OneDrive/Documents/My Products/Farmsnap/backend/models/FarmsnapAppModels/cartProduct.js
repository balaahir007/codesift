    import mongoose, { Types } from "mongoose";

    const CartProductSchema = mongoose.Schema({
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products',
            require : true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },{timestamps : true})

    const CartProduct = mongoose.model("CartProduct",CartProductSchema)

    export default CartProduct;