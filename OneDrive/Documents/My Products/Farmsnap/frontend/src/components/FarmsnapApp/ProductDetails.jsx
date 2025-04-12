import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { newProduct } from "../../assets/assets";
import summuryApi from "../../common/summuryApi";
import handleAddToCart from "../../helpers/FarmsnapAppHelpers/addToCartProduct";
import RecommendedProducts from "./RecommendedProducts";
const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state?.product?.product || []);

  
  const [activeImage, setActiveImage] = useState();
  const product = products?.find((item) => item._id == id);  
  const handleActiveImage = (image) => {
    setActiveImage(image);
  };
  

  return (
    <div className="p-3">
      <div className="flex flex-col lg:flex-row bg-secondary p-6 md:p-10 rounded-lg relative">
        <h1 className="m-2 border-b-1 text-primary border-gray-200 lg:w-180 top-0 lg:absolute">{product?.productName}</h1>
        <div>
          <div className="grid grid-cols-3 lg:grid-cols-1  gap-2 sm:ml-8 mb-2">
          {product?.productimages.map((item, index) => (
            <img
              key={index}
              src={item}
              className="w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border  border-gray-300 hover:border-2 hover:border-gray-400 rounded-lg"
              onMouseEnter={() => handleActiveImage(item)}
            />
          ))}
          </div>
        </div>

        <div className="md:mx-6 flex-1">
          <img
            src={activeImage || product?.productimages[0]}
            alt={product?.productName}
            className=" w-full md:w-full h-60 md:h-130 max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-md object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 mt-6 lg:mt-40 lg:mr-50 text-gray-800">
          <p className="text-lg font-semibold">Farmer: {product?.farmerName}</p>
          <p className="text-md">Location: {product?.location}</p>
          <p className="text-md">Pincode: {product?.pincode}</p>
          <p className="text-md">
            Vehicle Shipment: {product?.vehicleShipment ? "Yes" : "No"}
          </p>
          <div className="flex gap-4 mt-4">
            <button className="border border-gray-400 py-2 px-4 rounded-lg bg-white hover:bg-gray-100 cursor-pointer" onClick={()=>handleAddToCart(product?._id)}>
              Add To Cart
            </button>
            <a href={`tel:${product?.mobileNumber}`}>
              <button className="bg-primary hover:bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg">
                Contact
              </button>
            </a>
          </div>
        </div>
      </div>
      <RecommendedProducts productName={product?.productName} currentProductId={id} />
    </div>
  );
};

export default ProductDetails;
