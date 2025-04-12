import React, { useEffect, useRef, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { MdDeleteForever, MdOutlineCloudUpload } from "react-icons/md";
import UserNotLogin from "../UserNotLogin";
import uploadImage from "../../../helpers/FarmsnapAppHelpers/imageUpload";
import summuryApi from "../../../common/summuryApi";
import { useNavigate } from "react-router-dom";
import { productCategory, tamilNaduDistricts } from "../../../assets/assets";
import customeToastify from "../../../helpers/FarmsnapAppHelpers/customToastify";
import axios from "axios";

const AddSellingProduct = ({ setShowProductForm, adminAddProducts }) => {
  const productInputRef = useRef();
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    farmerName: "",
    productName: "",
    location: "",
    pincode: null,
    mobileNumber: null,
    vehicleShipment: null,
    productimages: [],
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [images, setImages] = useState([]);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otherProduct, setOtherProduct] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleRemoveProduct = (index) => {
    console.log("index", index);

    setImages((prev) => prev.filter((_, i) => i !== index));
    console.log("produxts", images);
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files && files.length > 0) {
      const file = files[0];
      if (images.length < 6) {
        setImages((prev) => [...prev, file]);
      }
    } else {
      if (name === "productName" && e.target.tagName === "SELECT") {
        if (value === "Others") {
          setOtherProduct(true);
        } else {
          setOtherProduct(false);
        }
      }
      setProducts((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSendOtp = () => {
    if (products.mobileNumber && /^\d{10}$/.test(products.mobileNumber)) {
      setIsOtpSent(true);
      alert("OTP sent to " + products.mobileNumber);
    } else {
      alert("Enter a valid 10-digit mobile number");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (images.length === 0) {
      setLoading(false);
      setErrorMsg("Please upload at least one image.");
      return;
    }
    setErrorMsg("");

    try {
      const uploadedImages = await Promise.all(
        images.map((image) => uploadImage(image))
      );
      setProducts((prev) => ({
        ...prev,
        productimages: [
          ...prev.productimages,
          ...uploadedImages.filter((url) => url !== null),
        ],
      }));
      const {
        farmerName,
        productName,
        location,
        pincode,
        mobileNumber,
        vehicleShipment,
        productimages,
      } = products;

      if (
        !farmerName ||
        !productName ||
        !location ||
        !pincode ||
        !mobileNumber ||
        !vehicleShipment ||
        productimages?.length === 0
      ) {
        setLoading(false);
        return setErrorMsg("Please provide all the requiredddd information.");
      }

      const updatedProductData = {
        ...products,
        productimages: uploadedImages,
      };
      const response = await axios.post(summuryApi.uploadNewProduct,{updatedProductData},{
        withCredentials : true
      });
      setErrorMsg("");
      if (response.ok) {
        customeToastify("success", "Product Created Successfully");
        if (adminAddProducts) {
          navigate("/admin-pannel/products");
        } else {
          navigate("/become-a-seller");
        }
        setLoading(false);
        setShowProductForm(false);
      } else {
        setErrorMsg(response?.data?.error);
        setLoading(false);
        customeToastify("error", "Product Created Failed");
      }
    } catch (error) {
      setErrorMsg(error);
      customeToastify("error", "try Sometimes");
      setLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <div className="ml-4">
          <div className="mt-10 bg-secondary p-4">
            <div className="flex items-center justify-between text-[#304130]">
              <h1 className="text-xs text-[#304130]">
                Please Fill the form to Add New Product
              </h1>
              <CgCloseO
                onClick={() => setShowProductForm(false)}
                className="cursor-pointer"
              />
            </div>
            <form
              className="flex flex-col space-y-3 p-4 text-xs "
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                placeholder="Farmer Name"
                name="farmerName"
                value={products.farmerName}
                onChange={handleFormChange}
                className="bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
              />
              <select
                name="productName"
                value={products?.productName}
                onChange={handleFormChange}
                className="text-gray-500 bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
              >
                <option value="">Product Category</option>
                {productCategory.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {otherProduct && (
                <input
                  type="text"
                  placeholder="Product Name"
                  name="productName"
                  value={products?.productName || ""}
                  onChange={handleFormChange}
                  className="bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
                />
              )}

              <select
                name="location"
                value={products?.location}
                onChange={handleFormChange}
                className="text-gray-500 bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
              >
                <option value="">Select Location</option>
                {tamilNaduDistricts.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                value={products.pincode || ''}
                onChange={handleFormChange}
                className="bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={products.mobileNumber || ''}
                onChange={handleFormChange}
                className="bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
              />
              <div className="flex gap-2">
                {isOtpSent && (
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp || ''}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field bg-[#FFFAFA] p-2 border-[#E9E9E9] border focus:outline-none w-30"
                  />
                )}
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 w-20 rounded-lg"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
              <div
                className="relative flex justify-center items-center border-dashed border-gray-500 border-2 h-30 w-full bg-cover bg-center rounded-lg cursor-pointer"
                onClick={() => productInputRef.current.click()}
              >
                <MdOutlineCloudUpload className="text-3xl text-gray-700" />
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  ref={productInputRef}
                  onChange={handleFormChange}
                  accept="image/*"
                  multiple
                />
              </div>
              {images.length > 0 && (
                <ul className="mt-2 mx-10 flex flex-wrap gap-2">
                  {images.map((file, index) => {
                    const objectUrl = URL.createObjectURL(file);
                    return (
                      <li key={index} className="text-sm text-gray-700">
                        <div className="relative border rounded">
                          <img
                            src={objectUrl}
                            alt="product preview"
                            className="w-10 h-10 lg:w-20 lg:h-20 object-cover"
                          />
                          <MdDeleteForever
                            className="absolute bottom-0 hover:bg-white rounded-full p-1 lg:size-5 right-0 cursor-pointer text-red-500"
                            onClick={() => handleRemoveProduct(index)}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              <label className="text-xs text-gray-600">
                Do you have a vehicle for shipment?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="vehicleShipment"
                    value="yes"
                    checked={products.vehicleShipment === "yes"}
                    onChange={handleFormChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="vehicleShipment"
                    value="no"
                    checked={products.vehicleShipment === "no"}
                    onChange={handleFormChange}
                  />
                  <span>No</span>
                </label>
              </div>
              {errorMsg && <span className="text-red-500">{errorMsg}</span>}
              <button
                className="w-full cursor-pointer bg-primary text-white py-2 rounded-lg mt-4 flex justify-center items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Proceed"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <UserNotLogin />
      )}
    </div>
  );
};

export default AddSellingProduct;
