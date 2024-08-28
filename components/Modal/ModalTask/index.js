import React from 'react'

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-200 bg-opacity-75">
      <div className="flex flex-col items-center justify-start rounded-xl bg-black-200 p-4 ring-2 ring-[#99e24d]">
        {children}
        <button
          onClick={onClose}
          className="mt-4 rounded-[10px] bg-red-500 bg-opacity-30 px-4 py-2 text-[22px] hover:bg-red-800 hover:ring-2 hover:ring-red-500 focus:ring-2 focus:ring-[#99e24d]"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal