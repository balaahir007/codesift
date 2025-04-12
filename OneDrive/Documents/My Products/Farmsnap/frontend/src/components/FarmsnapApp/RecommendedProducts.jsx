import React from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RecommendedProducts = ({productName,currentProductId}) => {
    const { products, loading } = useSelector((state) => ({
        products: state?.product?.product || [],
        loading: state?.product?.loading || false,
      }));
  const loadingList = Array(10).fill(null);

  const filteredProducts = products?.length > 0 ? products.filter((item)=>(
    item?.productName === productName && item?._id !== currentProductId
  )) : []
  return (
    <div>
        <div className=''>
        <h1 className='mt-4 mx-4 mb-1'>Recommended Products</h1>
        <hr className='mr-10 ml-5 text-secondary'/>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
        {filteredProducts?.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <Link to={`/product/${item._id}`}>
              <img
                src={item.productimages?.[0] || "placeholder.jpg"}
                alt={item.name}
                className="w-28 h-20 md:w-38 md:h-24 object-cover rounded-md"
              />
            </Link>
            <div className="flex items-center mt-2">
              <CiLocationOn className="text-green-500 text-sm" />
              <h2 className="text-xs md:text-sm ml-1">{item.location || "Unknown"}</h2>
            </div>
          </div>
        ))}

        {loading &&
          products.length === 0 &&
          loadingList.map((_, index) => (
            <div key={index} className="flex flex-col items-center animate-pulse">
              <div className="bg-secondary w-28 h-20 md:w-38 md:h-24 rounded-md" />
              <div className="flex items-center mt-2">
                <div className="bg-secondary w-4 h-4 rounded-full"></div>
                <div className="ml-1 bg-secondary w-16 h-4"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RecommendedProducts
