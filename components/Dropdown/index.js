import React, { useState } from 'react'

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <p className="text-[16px] font-bold cursor-pointer">{title}</p>
      {isOpen && (
        <div className="absolute mt-0.5 w-36 rounded-[20px] shadow-lg bg-black-100 bg-opacity-75 z-10">
          <ul className="py-0.5">
            {items.map((item, index) => (
              <li key={index} className="px-0.5 py-0.5 text-sm text-white">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
