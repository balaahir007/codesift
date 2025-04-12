import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    farmerName: { type: String, required: true },
    productName: { type: String, required: true },
    location: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    pincode: { type: Number, required: true },
    vehicleShipment: { type: Boolean, required: true },
    productimages: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" } ,
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

const product = mongoose.model("Product", productSchema);
export default product;
