import cloudinary from "../../helper/ProfileImageUpload.js";
import User from "../../models/FarmsnapAppModels/userModel.js";
import Message from "../../models/FarmsnapChatAppModels/messageSchema.js";
import { getReceiverSocketId,io } from "../../utils/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const currentUserId = req.user?._id
        console.log("ci",currentUserId);
        
        const filteredUser = await User.find({_id : {$ne : currentUserId}}).select('-password')
        console.log("filteredUser",filteredUser);
        
        res.status(200).json(filteredUser)
      } catch (error) {
        console.error("Error in getUsersForSidebar controller", error);
        res.status(500).json({ error: "Internal Server Error, try again later." });
      }
}
export const getMessages = async(req,res)=>{
    try {
      const {id : userToChatId} = req.params
      const currentUserId = req.user?._id

      console.log(userToChatId,currentUserId);
      
      const message = await Message.find({$or : [
        {senderId : currentUserId,receiverId : userToChatId},
        {senderId : userToChatId,receiverId : currentUserId},
      ]})
      console.log("getMessages",message);
      
        res.status(200).json(message)
      } catch (error) {
        console.error("Error in getMessages controller", error);
        res.status(500).json({ error: "Internal Server Error, try again later." });
      }
}

export const sendMessage = async(req,res)=>{
  try {
    const {text,image} = req.body;
    console.log(text,image)    
    const currentUserId = req.user?._id
    const {id : receiverId} = req.params;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
      senderId : currentUserId,
      receiverId,
      text,
      image : imageUrl
    })
    if(!newMessage){
      return res.status(400).json({error : 'Something went wrong'})
    }

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage',newMessage)
    }    
    await newMessage.save()
    res.status(201).json(newMessage)

  } catch (error) {
    console.error("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error, try again later." });
  }
}