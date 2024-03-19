import React from 'react'

const SuccessAnimation = ({ message }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white p-5 rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center p-5">
        <div className="animate-bounce w-16 h-16 flex items-center justify-center bg-green-500 text-white font-bold rounded-full">
          ✓
        </div>
        <p className="text-lg text-green-700 mt-4">{message}</p>
      </div>
    </div>
  )
}

export default SuccessAnimation
