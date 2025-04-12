import Shipment from "../../models/FarmsnapAppModels/shipmentModel.js";

const createShipment = async (req, res) => {
  try {
    const {aadhaarNumber,drivingLicence } = req.body

    const ExistingShipment = await Shipment.findOne({
        $or : [
            {
                aadhaarNumber,drivingLicence
            }
        ]
    })
    if(ExistingShipment){
        return res.status(400).json({error : 'Shipment is Already added for this information'})
    }
    
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.status(201).json({ data: shipment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createShipment };
