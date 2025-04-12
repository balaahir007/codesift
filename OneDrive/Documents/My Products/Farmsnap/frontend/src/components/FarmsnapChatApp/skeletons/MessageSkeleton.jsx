import React from 'react'
// note : updated The ui in later asap
const MessageSkeleton = () => {
    const skeletonMessages = Array(8).fill(null)
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {
        skeletonMessages.map((_,idx)=>(
            <div key={idx} className={`chat ${idx %2 === 0 ? 'text-start' : 'text-end'}`}>
                <div className=' avatar '>

                </div>

            </div>
        ))
      }
    </div>
  )
}

export default MessageSkeleton
