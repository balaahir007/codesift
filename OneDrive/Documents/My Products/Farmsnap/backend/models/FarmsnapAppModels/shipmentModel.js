import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  drivingLicence: {
    type: String,
    required: true,
    trim: true
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{12}$/ 
  },
  vichleType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true,
    match: /^[0-9]{6}$/ 
  },
  mobileNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/ 
  }
}, { timestamps: true });

const Shipment = mongoose.model('Shipment', shipmentSchema);

export default Shipment;
