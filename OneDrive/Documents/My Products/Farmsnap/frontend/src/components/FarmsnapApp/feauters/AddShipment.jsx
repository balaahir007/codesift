import React, { useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import { vehicles } from '../../../assets/assets';
import axios from 'axios'
import summuryApi from '../../../common/summuryApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShipment } from '../../../redux/FarmsnapAppRedux/shipment/shipmentSlice';
import UserNotLogin from '../UserNotLogin';
import customeToastify from '../../../helpers/FarmsnapAppHelpers/customToastify';

const AddShipment = ({ setShowShipmentAddForm }) => {
  const [shipmentData, setShipmentData] = useState({
    drivingLicence: '',
    aadhaarNumber: '',
    vichleType: '',
    location: '',
    pincode: '',
    mobileNumber: '',
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setShipmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();

    setShipmentData((prev) => ({
      ...prev,
      aadhaarNumber: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
  
    let { drivingLicence, location, aadhaarNumber, vichleType, mobileNumber, pincode } = shipmentData;
    let aadhaarWithoutSpaces = aadhaarNumber.replace(/\s/g, '');
  
    if (!drivingLicence || !location || !aadhaarWithoutSpaces || !vichleType || !mobileNumber || !pincode) {
      setLoading(false);
      return setErrorMsg('Please enter all the information.');
    }
    if (aadhaarWithoutSpaces.length !== 12) {
      setLoading(false);
      return setErrorMsg('Aadhar number must be 12 digits.');
    }
    if (mobileNumber.length !== 10) {
      setLoading(false);
      return setErrorMsg('Please provide a valid mobile number.');
    }
    if (pincode.length !== 6) {
      setLoading(false);
      return setErrorMsg('Please provide a valid pincode.');
    }
  
    const newShipmentData = {
      drivingLicence,
      location,
      aadhaarNumber: aadhaarWithoutSpaces,
      vichleType,
      mobileNumber,
      pincode,
    };
  
    try {
      const response = await axios.post(summuryApi.createNewShipment, newShipmentData, {
        withCredentials : true
      });
  
      if (response?.data?.data) {
        customeToastify('success','Shipment Created Successfully')
        setShowShipmentAddForm(false); 
        dispatch(setShipment(response?.data?.data))
        console.log(response?.data?.data);
        navigate('/shipment'); 
      } else {
        customeToastify('error','Shipment Created Failed')
        setErrorMsg(response?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Something went wrong');
      customeToastify('error','try sometimes')
    } finally {
      setLoading(false);
    }
  };

  const currentUser = localStorage.getItem('user')
  

  return (
    <div>
      {
        currentUser ? (
            <div className="bg-secondary mt-4 p-4">
              <div className="text-sm flex items-center justify-between text-[#304130]">
                <p>Please Fill the form for Your Shipment</p>
                <CgCloseO onClick={() => setShowShipmentAddForm(false)} className="size-4 cursor-pointer" />
              </div>
      
              <form className="flex flex-col space-y-3 p-4 text-xs" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Driving Licence"
                  name="drivingLicence"
                  onChange={handleFormChange}
                  value={shipmentData.drivingLicence}
                  className="input-box"
                  disabled={loading}
                />
      
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  name="aadhaarNumber"
                  onChange={handleAadhaarChange}
                  value={shipmentData.aadhaarNumber}
                  className="input-box"
                  maxLength={14}
                  disabled={loading}
                />
      
                <select
                  name="vichleType"
                  value={shipmentData.vichleType}
                  id="vechile"
                  onChange={handleFormChange}
                  className="text-gray-500 input-box"
                  disabled={loading} 
                >
                  <option defaultValue="Select Vichle">Select Vichle</option>
                  {vehicles.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
      
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleFormChange}
                  value={shipmentData.location}
                  className="input-box"
                  disabled={loading}
                />
      
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  onChange={handleFormChange}
                  value={shipmentData.pincode}
                  className="input-box"
                  disabled={loading}
                />
      
                <input
                  type="number"
                  placeholder="Mobile Number"
                  name="mobileNumber"
                  onChange={handleFormChange}
                  value={shipmentData.mobileNumber}
                  className="input-box"
                  disabled={loading}
                />
      
                <div className="flex items-center gap-4 ml-8">
                  <input
                    type="number"
                    placeholder="OTP"
                    disabled={loading} 
                    className="w-20 bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
                  />
                  <button className="bg-[#0097B2] text-white p-2 rounded-md">Verify</button>
                  <button className="p-2 border rounded-md">Resend</button>
                </div>
      
                {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
                <button type="submit" className="btn flex items-center h-7  justify-center cursor-pointer " disabled={loading}>
                  {loading ? <span className='animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5'></span> : 'Proceed'}
                </button>
              </form>
      
              <div>
                <h2 className="text-red-500">Note:</h2>
                <ul className="text-sm m-1">
                  <li className="my-2">
                    🚚 Adding a vehicle for shipment is optional. If you need shipment assistance, you can book a delivery service through FarmSnap.
                  </li>
                  <li className="my-2">
                    📩 Once you proceed with shipment, we will contact you for confirmation. Please respond to the message to avoid delays.
                  </li>
                </ul>
              </div>
            </div>
        ):(
          <div>
            <UserNotLogin/>
          </div>
        )
      }

    </div>
  );
};

export default AddShipment;
