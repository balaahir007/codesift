import product from "../../models/FarmsnapAppModels/productModel.js"
import User from "../../models/FarmsnapAppModels/userModel.js"
import user from "../../models/FarmsnapAppModels/userModel.js"

export const getAllUser = async(req,res)=>{
    try {      
        const currentUser = req?.user?._id
        const userInfo = await user.findById(currentUser)
        console.log("use",userInfo);
        
        if(!user){
            return res.status(400).json({error : 'User Not, Authenticated, Please Login First'})
        }
        const isAdmin = userInfo.role === 'ADMIN'
        if(!isAdmin){
            return res.status(400).json({error : 'User Not a Admin, admin can only see that'})
        }
        const users = await user.find({_id : {$ne : userInfo?._id}}).select('-password')        
        if(!users){
            return res.status(404).json({error : 'User Not Found , please try Sometimes'})
        }
        res.status(200).json({data : users})
    } catch (error) {
        
    }
}

export const getAllProductsForAdminPannel = async (req,res)=>{
  try {
    const allProducts = await product.find()
    if(!allProducts){
      return res.status(404).json({error : "product Not Found,please try again"})
    }    
    res.status(200).json({data : allProducts})
  } catch (error) {
    console.error("Error in getAllProducts controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}

export const adminProductApproval = async(req,res)=>{
  try {
    const {id} = req.params;
    const approvedProducts = await product.findById(id)
    approvedProducts.status = 'approved'
    approvedProducts.save()
    if(!approvedProducts){
      return res.status(404).json({error : "product Not Found,please try again"})
    }    
    res.status(200)
  } catch (error) {
    console.error("Error in adminProductApproval controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}

export const userAdminOrGeneralChange = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role === 'ADMIN' ? 'GENARAL' : 'ADMIN';

    await user.save();

    console.log(user);
    return res.status(200).json({ message: "User role updated successfully", user });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
