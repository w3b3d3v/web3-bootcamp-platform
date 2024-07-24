import { useState } from 'react'
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaMoneyBillAlt } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const Filter = () => {
  const [isOpen, setIsOpen] = useState({
    skill: false,
    effort: false,
    demandingTeam: false,
    contextDepth: false,
    reward: false,
  })

  const subItems = {
    skill: ['Sub Item 1', 'Sub Item 2', 'Sub Item 3'],
    effort: ['Sub Item 1', 'Sub Item 2'],
    demandingTeam: ['Sub Item 1', 'Sub Item 2', 'Sub Item 3'],
    contextDepth: ['Sub Item 1'],
    reward: [],
  }

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
    <div className={`p-2 text-white rounded-lg w-60 ${
      isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
    }`}>
      <h3 className="mb-2 text-lg font-bold">Filter</h3>
      <ul>
        {Object.keys(isOpen).map((filterName) => (
          <li key={filterName} className="mb-2">
            <button
              onClick={() => toggleOpen(filterName)}
              className="flex items-center w-full px-2 py-1 bg-black-300 bg-opacity-30 rounded"
            >
              {subItems[filterName].length > 0 ? (
                isOpen[filterName] ? <FaRegCaretSquareUp className="mr-2" /> : <FaRegCaretSquareDown className="mr-2" />
              ) : (
                <FaMoneyBillAlt className="mr-2" />
              )}
              <span className="capitalize">{filterName.replace(/([A-Z])/g, ' $1')}</span>
            </button>
            {isOpen[filterName] && subItems[filterName].length > 0 && (
              <ul className="mt-2 ml-6 space-y-1">
                {subItems[filterName].map((subItem, index) => (
                  <div className='border-2 border-white' >
                  <li key={index} className="px-2 py-1 bg-black-300 bg-opacity-30 rounded ">{subItem}</li>
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
