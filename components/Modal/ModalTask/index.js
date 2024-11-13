import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

const Modal = ({ children, onClose }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <div className={`fixed mx-2 inset-0 flex items-center justify-center 
    ${isLight ? 'bg-white-200' : 'bg-black-200'} bg-opacity-75 z-50`}>
      
      <div className={`flex flex-col items-center justify-start rounded-lg 
        ${isLight ? 'bg-white-200' : 'bg-black-200'} p-2 ring-2 ring-[#99e24d] z-50`} 
        style={{boxShadow: isLight ? '0 0 10px rgba(30, 150, 255, 0.7)' : '0 0 10px rgba(153, 226, 77, 0.7)'}}>
      <div className='flex w-full justify-end'>
        <button
          onClick={onClose}
          className="my-1 mr-1 rounded-[10px] bg-red-500 bg-opacity-30 px-2 text-[18px] font-bold hover:bg-red-500 hover:ring-1 hover:ring-red-500 focus:ring-2 focus:ring-[#99e24d]"
        >
          X
        </button>
      </div>
      
        {children}
        
      </div>
    </div>
  )
}

export default Modal