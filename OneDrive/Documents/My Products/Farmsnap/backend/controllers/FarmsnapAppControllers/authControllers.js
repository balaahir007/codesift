import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken.js";
import User from "../../models/FarmsnapAppModels/userModel.js";
import cloudinary from "../../helper/ProfileImageUpload.js";

export const loginController = async (req, res) => {
  try {
    console.log("runnningggg");
    
    const { email, password } = req.body;
    console.log(email, password);
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ error: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    let token = generateToken(res, foundUser._id);

    res.status(200).json(foundUser);
  } catch (error) {
    console.error(`Error in Login Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email Format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ...req.body,
      password : hashedPassword
    });
    console.log("user",user);
    

    await user.save();
    let token = generateToken(res,user._id)

    res.status(201).json(user);
  } catch (error) {
    console.error(`Error in registerController Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt") 
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in registerController Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const profileImageUpload = async(req,res)=>{
  try {

    const {profilePic} = req.body
    console.log("profilePic",profilePic);
    
    const userId = req.user?._id

    if(!profilePic){
      return res.status(400).json({error : 'Profile Pic is required'})
    }
    const uploadresponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic : uploadresponse.secure_url},{new :true})

    res.status(201).json(updatedUser)


  } catch (error) {
    console.error(`Error in registerController Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const checkAuth = async(req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error(`Error in registerController Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  } 
}

export const addRequestController = async(req,res)=>{
  try {
    const currentUser = req?.user?._id
    if(!currentUser){
      return res.status(400).json({error : 'PLease login first...'})
    }
    const {farmerId} = req.body
    console.log(farmerId);

    const user = await User.findById(farmerId)
    
    user.farmerRequest.push(currentUser)
    await user.save()
    return res.status(201).json(user)
    
  } catch (error) {
    console.error(`Error in addRequestController Controller: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}