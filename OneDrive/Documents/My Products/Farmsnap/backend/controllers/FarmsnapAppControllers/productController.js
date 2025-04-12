import Product from "../../models/FarmsnapAppModels/productModel.js";
import User from "../../models/FarmsnapAppModels/userModel.js";

export const createNewProduct = async (req, res) => {
  try {
    const currentUser = req?.user?._id;    
    const { farmerName, productName, location, pincode, mobileNumber, vehicleShipment, productimages } = req.body;
    const vehicleShipmentYesOrNoToTrueOrFalseChange = vehicleShipment === 'yes'    
      
    if (!currentUser) {
      return res.status(400).json({ error: "Please login first." });
    }

    if (!farmerName || !productName || !location || !pincode || !mobileNumber || !vehicleShipment  || productimages?.length === 0) {
      return res.status(400).json({ error: "Please provide all the required information." });
    }
    const newProduct = new Product({
      productName,
      location,
      pincode,
      farmerName,
      mobileNumber,
      vehicleShipment :vehicleShipmentYesOrNoToTrueOrFalseChange,
      productimages,
      user: currentUser
    });

    
    await newProduct.save();
    res.status(201).json({ data: newProduct });

  } catch (error) {
    console.error("Error in createNewProduct controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
};

export const getLimitProducts = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit; 

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    res.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllCurrentUserProducts = async(req,res)=>{
  try {
    const userId = req?.user?._id
    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({
        error : 'user not Login ,please Login first...'
      })
    }
    const allProducts = await Product.find({user:userId});
    console.log("Get currentuserProducts",allProducts);
    
    if(!allProducts){
      return res.status(404).json({error : "Product Not FOund,please try again"})
    }
    console.log("All Products",allProducts);
    
    res.status(200).json({data : allProducts})
  } catch (error) {
    console.error("Error in getAllCurrentUserProducts controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}

export const getAllProducts = async (req,res)=>{
  try {
    const allProducts = await Product.find({status : 'approved'})
    if(!allProducts){
      return res.status(404).json({error : "Product Not Found,please try again"})
    }    
    res.status(200).json({data : allProducts})
  } catch (error) {
    console.error("Error in getAllProducts  controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}



export const deleteProduct = async(req,res)=>{
  try {
    const userId = req.user
    if(!userId){
      return res.status(400).json({
        error : 'user not Login ,please Login first...'
      })
    }
    const {id} = req.params
    if(!id){
      return res.status(400).json({error : 'Product Id is required..'})
    }
    const updatedProduct = await Product.findByIdAndDelete(id)
    console.log(updatedProduct);
    
    res.status(200).json({data : updatedProduct})
  } catch (error) {
    console.error("Error in delete Product controller", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerName, productName, location, pincode, mobileNumber, vehicleShipment, productimages } = req.body;

    const vehicleShipmentBoolean = vehicleShipment === 'yes';

    if (!farmerName || !productName || !location || !pincode || !mobileNumber || !vehicleShipment || !productimages || productimages.length === 0) {
      return res.status(400).json({ error: "Please provide all the required information." });
    }

    const updatedData = {
      farmerName,
      productName,
      location,
      pincode,
      mobileNumber,
      vehicleShipment: vehicleShipmentBoolean,
      productimages
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product Not Found" });
    }

    console.log(updatedProduct);

    res.status(201).json({ data: updatedProduct });

  } catch (error) {
    console.error("Error in updateProduct controller:", error);
    res.status(500).json({ error: "Internal Server Error, try again later." });
  }
};
 