import React, { useEffect, useRef, useState } from "react";
import AddSellingProduct from "./AddSellingProduct";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import summuryApi from "../../../common/summuryApi";
import { setCurrentUserAllProduct } from "../../../redux/FarmsnapAppRedux/product/CurrentUserProducts";
import ProductsEditForm from "./ProductsEditForm";
import DisplayImageHover from "./DisplayImageHover";
import { newProduct } from "../../../assets/assets";
import customeToastify from "../../../helpers/FarmsnapAppHelpers/customToastify";

const BecomeaSeller = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state?.CurrentUserProduct?.CurrentUserproduct);
  const products = newProduct;
  const [errorMsg, setErrorMsg] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showDotsOption, setShowDotsOption] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [formProductsData, setFormProductsData] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const dotsRef = useRef(null);
  const [hoverImage, setHoverImage] = useState();
  const [showDisplayImage, setShowDisplayImage] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dotsRef.current && !dotsRef.current.contains(event.target)) {
        setShowDotsOption({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const fetchCurrentUserProducts = async () => {
    try {
      const response = await axios.get(summuryApi.getAllCurrentUserProducts, {
        withCredentials : true
      });

      if (response.data) {
        dispatch(setCurrentUserAllProduct(response?.data?.data));
      } else {
        setErrorMsg(response?.error);
      }
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${summuryApi.deleteProductsById}/${id}`,{
        withCredentials : true
      });
      if (response.status === 200) {
        dispatch(
          setCurrentUserAllProduct(products.filter((item) => item._id !== id))
        );
        customeToastify('success',"Product deleted Successfully")
      } else {
        customeToastify('error',"Product deleted Failed")
        setErrorMsg(response?.error);
      }
    } catch (error) {
      customeToastify('error',"try Sometimes")
    }
  };
  const handleEdit = (product) => {
    setFormProductsData(product);
    setShowEditForm(true);
    setShowDotsOption({});
    scrollToTop()
  };
  const handleProductImagesHover = (productImages) => {
    setShowDisplayImage(true);
    setProductImages(productImages);
    
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log("products", products);

  useEffect(() => {
    fetchCurrentUserProducts();
  }, []);

  return (
    <div>
      {!showProductForm  || products?.length > 0 && (
        <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="flex items-center text-sm justify-between flex-wrap gap-2 mb-4">
            <h1 className="text-primary  sm:text-2xl font-semibold">
              Your Products
            </h1>
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-[#009951] px-5 py-2 cursor-pointer rounded-lg text-white text-sm font-medium shadow-md hover:bg-[#007a3d] transition"
            >
              + Add New Product
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition p-4"
              >
                <div className="flex items-center space-x-4">
                  {item.productimages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="w-12 h-12 object-cover rounded-md cursor-pointer border border-gray-300"
                      alt="Product"
                      onClick={() => {
                        handleProductImagesHover(item.productimages);
                        setHoverImage(img);
                        scrollToTop()
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex flex-col space-y-2 text-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.productName}
                  </h2>
                  <p className="text-sm font-medium">By: {item.farmerName}</p>
                  <p className="text-xs text-gray-500">
                    {item.location.length > 50
                      ? item.location.slice(0, 50) + "..."
                      : item.location}
                  </p>
                  <p className="text-sm font-medium">
                    📞 +91 {String(item.mobileNumber)}
                  </p>
                  <span className="inline-block text-xs font-semibold border-primary border-1 bg-secondary px-3 py-1 rounded-full w-fit">
                    {item?.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4 cusrs">
                  <button
                    className="text-sm text-white bg-red-500 px-4 py-1 cursor-pointer  rounded-md hover:bg-red-600 transition"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="text-sm text-white bg-blue-500 px-4 py-1 cursor-pointer rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="lg:px-20 px-5 flex relative">
        {!showProductForm && products?.length === 0 && (
          <div>
            <h2 className="font-bold lg:text-lg">
              Become a Seller on FarmSnap
            </h2>
            <hr className="w-40 text-primary" />
            <p className="text-[#304130] text-[10px] lg:text-sm">
              Are you a farmer or vendor? FarmSnap helps you sell fresh produce,
              grains, dairy, and more!
            </p>
            <span className="text-blue-500 text-[8px] lg:text-[10px] cursor-pointer">
              Learn More About Selling?
            </span>
            <button
              onClick={() => setShowProductForm(true)}
              className="cursor-pointer lg:p-2 xl:ml-40 p-1 bg-primary text-white rounded-lg text-[8px] lg:text-[10px]"
            >
              Add Product
            </button>
          </div>
        )}
        {showProductForm && (
          <div className="w-full lg:px-40 md:px-20 px-2 left-0 right-0 bottom-0 top-2">
            <AddSellingProduct setShowProductForm={setShowProductForm} />
          </div>
        )}
      </div>

      {showEditForm && (
        <div className="absolute inset-0 mt-30 flex items-center  w-full justify-center bg-white/70 z-40">
          <ProductsEditForm
            setShowEditForm={setShowEditForm}
            productsData={formProductsData}
          />
        </div>
      )}
      {showDisplayImage && (
        <div className="absolute inset-0 mt-30 flex items-center w-full justify-center h-full bg-white/90 z-40">
          <DisplayImageHover
            productImages={productImages}
            onClose={setShowDisplayImage}
            hoverImage={hoverImage}
            setHoverImage={setHoverImage}
          />
        </div>
      )}
    </div>
  );
};

export default BecomeaSeller;
