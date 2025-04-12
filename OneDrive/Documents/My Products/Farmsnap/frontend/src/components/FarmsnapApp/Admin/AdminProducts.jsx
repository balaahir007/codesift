import React, { useEffect, useState, useRef } from 'react';
import { CgSearch } from 'react-icons/cg';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { adminProducts, newProduct, productCategory, tamilNaduDistricts } from '../../../assets/assets';
import axios from 'axios';
import summuryApi from '../../../common/summuryApi';
import AddSellingProduct from '../feauters/AddSellingProduct';

const AdminProducts = () => {
    const productAccomplishment = [
        { count: 1200, text: 'Product' },
        { count: 1052, text: 'Completed' },
        { count: 148, text: 'Pending' },
    ];

    const [formData, setFormData] = useState({
        category: '',
        location: '',
        status: '',
        search: '',
    });     

    const [products, setProducts] = useState([]);
    const [showDotsOption, setShowDotsOption] = useState({});
    const dotsRef = useRef(null);
    const [showProductForm, setShowProductForm] = useState(false);


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
    }, []);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(summuryApi.getAllProductsForAdminPannel);
                if (response?.data?.data) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchAllProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value.toLowerCase().trim() || '',
        }));
    };

    const filterProductData = products.filter((item) => (
        item?.location?.toLowerCase().includes(formData.location) &&
        item?.productName?.toLowerCase().includes(formData.category) &&
        item?.status?.toLowerCase().includes(formData.status) &&
        item?.productName?.toLowerCase().includes(formData.search)
    ));
    const deleteProduct = async (productId) => {
        console.log("ProductsniD",productId);
        try {
          const response = await axios.delete(`${summuryApi.deleteProductsById}/${productId}`,{},{
            withCredentials : true
          });
    
          if (response.status === 200) {
            setProducts((prev) => prev.filter((product) => product._id !== productId));
            console.log("Product deleted successfully.");
          } else {
            setErrorMsg(response?.error);
          }
        } catch (error) {
          console.error(
            "Error deleting product:",
            error.response?.data || error.message
          );
        }
      };

    const productApproval = async(productId) => {
        console.log("Preint",productId);
        
        const response = await axios.post(`${summuryApi.adminProductApproval}/${productId}`,{},{
            withCredentials : true
        })
        if(response.ok){
            setProducts((prev) => (prev.map((product)=> 
                product._id === productId && product.status === 'pending' ? {...product,status : 'approved'} : product
            )))
        }
        setShowDotsOption({})
    }
    return (
        <>
        {
            showProductForm ? (
                <div className='p-6 md:px-10 absolute xl:-top-12 -top-4 lg:px-16 xl:w-280 lg:w-200 w-100   md:w-180 mt-10 md:mt-0  min-h-screen'><AddSellingProduct setShowProductForm={setShowProductForm} adminAddProducts = {true} /></div>
            ) : (
                <div className="p-6 pb-20 md:px-10 lg:px-16 xl:w-280 lg:w-200 md:w-180 w-auto overflow-y-scroll h-full scrollbar-hide fixed md:mt-0   rounded-md bg-white shadow  min-h-screen">
                    <div className=''>
                    <div className="grid grid-cols-3 gap-4 text-center">
                {productAccomplishment.map((item, index) => (
                    <div key={index} className={`flex flex-col items-center border-gray-100 ${index === 2 && 'border-none'} border-r-2`}>
                        <h1 className="font-bold md:text-xl text-sm text-green-800">{item.count}</h1>
                        <span className="text-sm text-green-600">{item.text}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 items-center mt-6 w-full">
                <div className="relative xl:w-full">
                    <CgSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 text-lg" />
                    <input
                        type="text"
                        onChange={handleChange}
                        name="search"
                        className="border rounded-md text-sm pl-10 pr-4 border-green-300 focus:outline-green-200 py-2 w-full bg-white"
                        placeholder="Search for Products"
                    />
                </div>
                <div className='p-2 text-nowrap gap-2 rounded-md flex text-sm bg-primary hover:bg-green-800 cursor-pointer text-white' onClick={()=>setShowProductForm(true)}>
                    <button className='cursor-pointer'>+</button>
                    <button className='hidden md:block cursor-pointer'>Add Product</button>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4  justify-center">
                {["category", "location", "status"].map((name, idx) => (
                    <select
                        key={idx}
                        className="bg-[#CED4D1]  focus:outline-none overflow-auto scrollbar-hide h-full rounded-lg px-3 py-2 text-sm text-whie shadow"
                        name={name}
                        onChange={handleChange}
                    >
                        <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
                        {(name === "category" ? productCategory : name === "location" ? tamilNaduDistricts : ["pending", "approved"])?.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                ))}
            </div>
                    </div>

            <div className="mt-6 grid grid-cols-1 gap-6" ref={dotsRef}>
                {filterProductData?.map((item) => (
                    <div key={item?._id} className="bg-white shadow-md  rounded-2xl p-6 relative hover:bg-[#CED4D1]">
                        <h1 className="font-semibold text-green-800">{item?.productName}</h1>
                        <div className="flex md:gap-6 gap-2 items-center mt-2">
                            {item.productimages?.map((img, index) => (
                                <img key={index} src={img} className="size-8 cursor-pointer rounded-lg shadow" alt="Product" />
                            ))}
                        </div>
                        <div className="flex items-center justify-between gap-1 md:gap-2 text-nowrap text-[12px] md:text-sm text-gray-600 mt-2">
                           <div className='md:flex md:flex-row flex flex-col gap-1 md:gap-2'>
                            <h1 className="text-green-700">{item?.farmerName}</h1>
                            <span>{item?.location?.length > 50 ? item.location.slice(0, 50) + "..." : item?.location}</span>
                            <span>+91 {item?.mobileNumber}</span>
                            <span>{item?.pincode}</span>
                           </div>
                            <div>
                            <span className={`${item?.status === 'pending' ? 'bg-red-600' : 'bg-primary'} text-white p-1 rounded-4xl`}>{item?.status}</span>
                            </div>
                        </div>
                        <HiOutlineDotsVertical onClick={() => setShowDotsOption((prev) => ({ [item?._id]: !prev[item?._id] }))} className="cursor-pointer text-green-700 absolute top-4 right-4" />
                        {showDotsOption[item?._id] && (
                            <div className="absolute bg-white top-8 right-5 text-black flex flex-col border border-primary items-center text-xs shadow-md rounded  p-2">
                                {
                                    item?.status === 'pending' && (
                                        <button className="cursor-pointer rounded hover:text-white hover:bg-primary w-full p-1" onClick={()=>productApproval(item?._id)} >
                                Approve
                                </button>
                                    )
                                }
                                <button className="cursor-pointer hover:text-white hover:bg-red-600 rounded w-full p-1" onClick={() => deleteProduct(item?._id)}>
                                Remove
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
            )
        }
        </>
    );
};

export default AdminProducts;
