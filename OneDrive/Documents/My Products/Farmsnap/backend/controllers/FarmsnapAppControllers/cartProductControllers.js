import CartProduct from "../../models/FarmsnapAppModels/cartProduct.js";

export const addToCartProduct = async (req, res) => {
  try {
    const currentUserId = req?.user?._id;
    const { productId } = req.body;
    console.log("Products", productId);

    if (!currentUserId) {
      return res.status(400).json({ error: "please login first" });
    }
    const cartProduct = await CartProduct.findOne({ productId });

    if (cartProduct) {
      return res.status(404).json({ error: "Product is Already in the Cart" });
    }
    const payload = {
      productId,
      userId: currentUserId,
    };
    const newCartProduct = new CartProduct(payload);
    const savedCartProduct = await newCartProduct.save();
    return res.status(200).json({ data: savedCartProduct });
  } catch (error) {
    console.error(`Error in addToCartProduct Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllCartProduct = async (req, res) => {
  try {
    const currentUserId = req?.user?._id;
    
    const allCartProducts = await CartProduct.find({ userId: currentUserId })
      .populate({
        path: "productId",
        select:
          "farmerName productName location mobileNumber pincode vehicleShipment productimages",
      }).select('-userId -__v -_id -updatedAt -createdAt')
      .lean();
      console.log("products",allCartProducts);
      

    if (allCartProducts.length === 0) {
      return res.status(404).json({ error: "Cart is Empty" });
    }

    return res.status(200).json({ data: allCartProducts });
  } catch (error) {
    console.error(`Error in getAllCartProduct Controller: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCartProduct = async(req,res)=>{
  try {
    console.log("hi");
    
    const currentUserId = req?.user?._id;
    const { productId } = req.params;
    const deletedCartProduct = await CartProduct.findOneAndDelete({
      userId: currentUserId,
      productId: productId,
  });
  console.log("deleted",deleteCartProduct);
  
  if (!deletedCartProduct) {
    return res.status(404).json({ message: "Product not found in cart" });
}

    return res.status(200).json({ data: deletedCartProduct });
  } catch (error) {
    console.error(`Error in deleteProduct Controller: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

