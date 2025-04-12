import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImageHover = ({ productImages,onClose,hoverImage, setHoverImage }) => {

    return (
        <div className='bg-white flex flex-col md:absolute top-2 items-center p-4 rounded-lg shadow-lg w-150'>
            <div className='flex items-center justify-between w-full mb-2 text-primary '>
                <span className='text-lg font-semibold'>Product Images</span>
                <CgClose className='cursor-pointer text-xl' onClick={()=>onClose(false)}/>
            </div>
            <div className='bg-white p-2 rounded-lg shadow-sm'>
                <img src={hoverImage} alt="Product Preview" className='md:w-150 md:h-104 object-cover' />
            </div>
            <div className='flex gap-2 mt-3'>
                {productImages.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Thumbnail ${index}`} 
                        className='w-16 h-16 object-cover cursor-pointer border-2 border-transparent hover:border-gray-400 rounded-md' 
                        onMouseEnter={() => setHoverImage(image)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayImageHover;
