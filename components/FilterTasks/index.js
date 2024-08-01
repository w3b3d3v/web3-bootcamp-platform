import { useState } from 'react'
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaMoneyBillAlt } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const Filter = ({ filters, subItems }) => {
  const [isOpen, setIsOpen] = useState(
    Object.keys(filters).reduce((acc, filterName) => {
      acc[filterName] = false
      return acc
    }, {})
  )

  const { theme } = useTheme()
  const isLight = theme === 'light'

  const toggleOpen = (filterName) => {
    if (subItems[filterName].length > 0) {
      setIsOpen((prevState) => ({
        ...prevState,
        [filterName]: !prevState[filterName],
      }))
    }
  }

  return (
    <div
      className={`text-white lg:w-[20%] w-[100%] rounded-lg p-2 ${
        isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
      }`}
    >
      <h3 className="mb-2 text-lg font-bold">Filter</h3>
      <ul className="flex lg:flex-col flex-wrap mx-2 items-center lg:items-start  justify-center">
        {Object.keys(filters).map((filterName) => (
          <li key={filterName} className="mb-2 lg:text-[14px] text-[12px] ml-1">
            <button
              onClick={() => toggleOpen(filterName)}
              className="flex w-full items-center rounded bg-black-300 bg-opacity-0 px-1 py-1"
            >
              {subItems[filterName].length > 0 ? (
                isOpen[filterName] ? (
                  <FaRegCaretSquareUp className="mr-2" />
                ) : (
                  <FaRegCaretSquareDown className="mr-2" />
                )
              ) : (
                <FaMoneyBillAlt className="mr-2" />
              )}
              <span className="capitalize">{filterName.replace(/([A-Z])/g, ' $1')}</span>
            </button>
            {isOpen[filterName] && subItems[filterName].length > 0 && (
              <ul className="mt-1 ml-2 space-y-1">
                {subItems[filterName].map((subItem, index) => (
                  <div key={index} className="border-white border-2">
                    <li className="rounded bg-black-300 bg-opacity-15 px-1 py-1 text-[12px]">
                      {subItem}
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter
