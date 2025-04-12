import axios from "axios";
import summuryApi from "../../common/summuryApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");

const handleAddToCart = async (productId) => {
  const styleWidth = window.innerWidth < 768 ? '70vw' : '300px'
  try {
    const response = await axios.post(
      summuryApi.addToCartProduct,
      { productId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (response?.data?.data) {
      toast.success("Added to Cart Successfully!", {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style : {styleWidth}
      });
    } else {
      toast.info("Already added to Cart!", {
        position: "top-right",
        autoClose: 30,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style : {styleWidth}
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to add to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      style : {width : styleWidth}
    });
    console.error("Error:", error.response?.data?.error || error.message);
  }
};

export default handleAddToCart;
