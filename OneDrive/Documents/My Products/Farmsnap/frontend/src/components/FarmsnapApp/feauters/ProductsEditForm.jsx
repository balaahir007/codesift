import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDeleteForever, MdOutlineCloudUpload } from "react-icons/md";
import uploadImage from "../../../helpers/FarmsnapAppHelpers/imageUpload";
import axios from "axios";
import summuryApi from "../../../common/summuryApi";
import { useDispatch } from "react-redux";
import { updateProductInState } from "../../../redux/FarmsnapAppRedux/product/CurrentUserProducts";
import { tamilNaduDistricts } from "../../../assets/assets";
import customeToastify from "../../../helpers/FarmsnapAppHelpers/customToastify";

const ProductsEditForm = ({ setShowEditForm, productsData }) => {
  const [products, setProducts] = useState({
    productID: productsData._id,
    farmerName: productsData.farmerName || "",
    productName: productsData.productName || "",
    location: productsData.location || "",
    pincode: productsData.pincode || "",
    mobileNumber: productsData.mobileNumber || "",
    vehicleShipment: productsData.vehicleShipment || "no",
    productimages: productsData.productimages,
  });
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(productsData.productimages || []);
  const [newProductImages, setNewProductImages] = useState([]);
  const productInputRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setNewProductImages((prev) => [...prev, ...files]);
  };

  console.log(images, "images");

  const handleRemoveProduct = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setProducts((product) => ({
      ...product,
      productimages: product.productimages.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadedImages = await Promise.all(
      newProductImages.map((image) => uploadImage(image))
    );

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
      !vehicleShipment
    ) {
      setLoading(false);
      return setErrorMsg("Please provide all the required information.");
    }
    console.log(products, "product");
    const updatedProductData = {
      ...products,
      productimages: [
        ...products.productimages,
        ...uploadedImages.filter((url) => url !== null),
      ],
    };

    if (products.productimages.length > 6) {
      setLoading(false);
      return setErrorMsg("Product Images should less than 6 images..");
    }
    const response = await axios.put(
      `${summuryApi.updateProductsById}/${products.productID}`,
      {updatedProductData},{
        withCredentials : true
      }
    );
    const data = await response.json();
    if (data?.data) {
      dispatch(updateProductInState(data?.data));
      setShowEditForm(false);
      setLoading(false);
      customeToastify('success','Product Updated Successfully')
    } else {
      setErrorMsg(data?.error);
      setLoading(false);
      customeToastify('error','Product Updated Failed')
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center drop-shadow-lg mt-40 md:mt-4 p-4 text-sm w-full relative">
      <form
        className="max-w-lg w-full flex flex-col bg-white p-6 rounded-lg shadow-lg space-y-4 relative"
        onSubmit={handleFormSubmit}
      >
        <IoIosClose
          className="absolute top-0  right-2 text-2xl cursor-pointer text-gray-600 hover:text-gray-900"
          onClick={() => setShowEditForm(false)}
        />
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            name="farmerName"
            value={products.farmerName}
            onChange={handleFormChange}
            className="input-field"
            disabled={loading}
          />
          
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={products.productName}
            onChange={handleFormChange}
            className="input-field"
            disabled={loading}
          />
          <select
            name="location"
            value={products.location}
            onChange={handleFormChange}
            id=""
            className="p-2 border-[#E9E9E9] border focus:outline-none rounded-lg"
          >
            <option value="">Select Location</option>
            {tamilNaduDistricts.map((item, index) => (
              <div key={index} className="text-[#304130]">
                <option value={item}>{item}</option>
              </div>
            ))}
          </select>
          <input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={products.pincode}
            onChange={handleFormChange}
            className="input-field"
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={products.mobileNumber}
            onChange={handleFormChange}
            className="input-field"
            disabled={loading}
          />
        </div>
        <div
          className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-500 h-32 w-full bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => productInputRef.current.click()}
        >
          <MdOutlineCloudUpload className="text-3xl text-gray-700" />
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={productInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            disabled={loading}
          />
        </div>
        {images.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {images.map((file, index) => (
              <li key={index} className="relative">
                <img
                  src={file}
                  alt="product preview"
                  className="w-15 h-12 object-cover border rounded"
                />
                <MdDeleteForever
                  display={!loading}
                  className="absolute bottom-1 right-1 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveProduct(index)}
                />
              </li>
            ))}
          </ul>
        )}
        <div>
          <label className="text-sm font-semibold">
            Do you have a vehicle for shipment?
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="vehicleShipment"
                value="yes"
                checked={products.vehicleShipment === "yes"}
                onChange={handleFormChange}
                disabled={loading}
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
                disabled={loading}
              />
              <span>No</span>
            </label>
          </div>
        </div>
        {errorMsg && <span className="text-red-500  text-xs">{errorMsg}</span>}
        <button
          className="w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg mt-4 flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductsEditForm;
