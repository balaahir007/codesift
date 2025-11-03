import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center flex-col min-h-screen items-center w-full'>
        <span className='animate-spin w-8 h-8 rounded-full border-primary border-t-transparent border-2'></span>
        <span>Loading...</span>
    </div>
  )
}

export default Spinner
