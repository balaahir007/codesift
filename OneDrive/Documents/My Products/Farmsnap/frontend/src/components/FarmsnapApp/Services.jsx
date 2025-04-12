import React from 'react'
import { services } from '../../assets/assets'

const Services = () => {
  return (
    <div className='md:mt-20 md:mb-80'>
        <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 items-center justify-center align-middle mx-10 md:mx-20 lg:mx-40'>
            {services.map((item,index)=>(
                <div key={index} className='w-60  mt-2 h-30 border flex flex-col items-center p-4 text-[8px] md:text-xs  space-y-3.5 mb-1'>
                    <img src={item.image} alt="" className='size-6 flex items-center'/>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Services
