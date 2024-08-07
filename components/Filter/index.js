import React, { useState, useEffect } from 'react'
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaCheckCircle } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const Filter = ({ filters, selectedFilters, setFilters }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(
    Object.keys(filters).reduce((acc, filterName) => {
      acc[filterName] = false
      return acc
    }, {})
  )

  const { theme } = useTheme()
  const isLight = theme === 'light'

  const toggleOpen = (filterName) => {
    if (filters[filterName].length > 0) {
      setIsOpen((prevState) => ({
        ...prevState,
        [filterName]: !prevState[filterName],
      }))
    }
  }

  const updateURL = (updatedFilters) => {
    const query = {};
    for (const key in updatedFilters) {
      if (updatedFilters[key]) {
        query[key] = JSON.stringify(updatedFilters[key])
      }
    }
    router.push({
      pathname: router.pathname,
      query: query,
    })
  }

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterName]: selectedFilters[filterName] === value ? null : value,
    }
    setFilters(updatedFilters)
    updateURL(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, filterName) => {
      acc[filterName] = null
      return acc
    }, {});
    setFilters(clearedFilters)
    setIsOpen(
      Object.keys(filters).reduce((acc, filterName) => {
        acc[filterName] = false
        return acc
      }, {})
    )
    updateURL(clearedFilters)
  }

  useEffect(() => {
    if (router.query) {
      const loadedFilters = Object.keys(router.query).reduce((acc, filterName) => {
        acc[filterName] = JSON.parse(router.query[filterName])
        return acc
      }, {});
      setFilters(loadedFilters)
    }
  }, [router.query])

  return (
    <div
      className={`text-black lg:w-[20%] w-[100%] rounded-lg p-2 ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
        }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Filter</h3>
        <button onClick={clearFilters} className="text-sm font-bold">
          Clear
        </button>
      </div>
      <ul className="flex lg:flex-col flex-wrap mx-2 items-center lg:items-start justify-center">
        {Object.keys(filters).map((filterName) => (
          <li key={filterName} className="mb-2 lg:text-[14px] text-[12px] ml-1 w-full">
            <button
              onClick={() => toggleOpen(filterName)}
              className="flex w-full items-center justify-between rounded bg-black-300 bg-opacity-0 px-1 py-1"
            >
              <span className="capitalize">{filterName.replace(/([A-Z])/g, ' $1')}</span>
              {isOpen[filterName] ? (
                <FaRegCaretSquareUp className="ml-2" />
              ) : (
                <FaRegCaretSquareDown className="ml-2" />
              )}
            </button>
            {isOpen[filterName] && filters[filterName].length > 0 && (
              <ul className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                {filters[filterName].map((subItem, index) => (
                  <li
                    key={index}
                    className="rounded bg-black-300 bg-opacity-15 px-1 py-1 text-[12px] flex justify-between items-center cursor-pointer"
                    onClick={() => handleFilterChange(filterName, subItem)}
                  >
                    <span className={selectedFilters[filterName] === subItem ? 'text-[#99e24d] font-bold' : ''}>
                      {subItem}
                    </span>
                    {selectedFilters[filterName] === subItem && <FaCheckCircle className="text-[#99e24d] ml-2" />}
                  </li>
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
