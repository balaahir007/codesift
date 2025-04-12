import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import summuryApi from "../../../common/summuryApi";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(summuryApi.getAllCartProduct, {
          withCredentials : true
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data?.data || []);
      }
    } catch (error) {
      setErrorMsg("Failed to fetch cart products");
    }
  };

  const deleteCartProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${summuryApi.deleteCartProduct}/${productId}`,
        {
          withCredentials : true
        }
      );
      if (response.ok) {
        setProducts(
          products.filter((item) => item.productId._id !== productId)
        );
        setErrorMsg('')
      } else {
        setErrorMsg("Failed to delete product");
      }
    } catch (error) {
      setErrorMsg("Error deleting product");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {products?.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-6 relative hover:bg-gray-100 transition duration-300"
        >
          <h1 className="font-semibold text-green-800 text-lg">
            {item?.productId?.productName}
          </h1>
          <div className="flex gap-3 items-center mt-3">
            {item?.productId?.productimages?.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                className="w-16 h-16 object-cover rounded-lg shadow-md border"
                alt="Product"
              />
            ))}
          </div>
          <div className="mt-3 text-gray-600 text-sm">
            <p className="text-green-700 font-medium">
              {item?.productId?.farmerName}
            </p>
            <p>{item?.productId?.location}</p>'{" "}
            <a href={`tel:${item?.productId?.mobileNumber}`}>
              <button className="bg-primary mt-2 -ml-2 hover:bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg">
                Contact
              </button>
            </a>
          </div>
          <span>{item?.productId?._id}</span>
          <button
            className="absolute top-3 right-3 cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => deleteCartProduct(item?.productId?._id)}
          >
            <MdDelete size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
