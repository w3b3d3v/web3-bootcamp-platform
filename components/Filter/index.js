import React, { useState, useEffect } from 'react'
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaCheckCircle } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

const Filter = ({ filters, selectedFilters, setFilters, issues }) => {
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
    if (filters[filterName].length > 0 && (filterName !== 'Amount' || selectedFilters['Reward'])) {
      setIsOpen((prevState) => ({
        ...prevState,
        [filterName]: !prevState[filterName],
      }))
    }
  }

  const updateURL = (updatedFilters) => {
    const query = Object.entries(updatedFilters)
      .filter(([_, value]) => value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value)
        return acc
      }, {})

    router.push({
      pathname: router.pathname,
      query,
    })
  }

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterName]: selectedFilters[filterName] === value ? null : value,
    }
    if (filterName === 'Reward') {
      updatedFilters['Amount'] = null
    }
    setFilters(updatedFilters)
    updateURL(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, filterName) => {
      acc[filterName] = null
      return acc
    }, {})
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
      const loadedFilters = Object.entries(router.query).reduce((acc, [filterName, value]) => {
        acc[filterName] = JSON.parse(value)
        return acc
      }, {})
      setFilters(loadedFilters)
    }
  }, [router.query, setFilters])

  const getFilteredAmounts = () => {
    if (!selectedFilters['Reward']) return []
    return filters['Amount']
      .filter(amount =>
        issues.some(issue =>
          issue.fields.some(field => field.field === 'Amount' && field.value === amount) &&
          issue.fields.some(field => field.field === 'Reward' && field.value === selectedFilters['Reward'])
        )
      )
      .sort((a, b) => a - b)
  }

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
        {Object.entries(filters).map(([filterName, filterValues]) => (
          <li key={filterName} className="mb-2 lg:text-[14px] text-[12px] ml-1 w-full">
            <button
              onClick={() => toggleOpen(filterName)}
              className={`flex w-full items-center justify-between rounded bg-black-300 bg-opacity-0 px-1 py-1 ${filterName === 'Amount' && !selectedFilters['Reward'] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={filterName === 'Amount' && !selectedFilters['Reward']}
              title={filterName === 'Amount' && !selectedFilters['Reward'] ? 'Select a reward first' : ''}
            >
              <span className="capitalize">{filterName.replace(/([A-Z])/g, ' $1')}</span>
              {isOpen[filterName] ? (
                <FaRegCaretSquareUp className="ml-2" />
              ) : (
                <FaRegCaretSquareDown className="ml-2" />
              )}
            </button>
            {isOpen[filterName] && (
              filterName === 'Amount' ? (
                <AmountFilter
                  filteredAmounts={getFilteredAmounts()}
                  selectedAmount={selectedFilters[filterName]}
                  handleFilterChange={handleFilterChange}
                />
              ) : (
                <FilterList
                  filterName={filterName}
                  filterValues={filterValues}
                  selectedValue={selectedFilters[filterName]}
                  handleFilterChange={handleFilterChange}
                />
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const AmountFilter = ({ filteredAmounts, selectedAmount, handleFilterChange }) => (
  <div className="mt-1">
    <input
      type="range"
      min={0}
      max={filteredAmounts.length - 1}
      value={filteredAmounts.indexOf(selectedAmount || filteredAmounts[0])}
      onChange={(e) => handleFilterChange('Amount', filteredAmounts[parseInt(e.target.value)])}
      className="w-full"
      list="amount-options"
    />
    <datalist id="amount-options">
      {filteredAmounts.map((amount, index) => (
        <option key={amount} value={index} />
      ))}
    </datalist>
    <div className="flex justify-between text-xs mt-1">
      <span>{Math.min(...filteredAmounts)}</span>
      <span>{selectedAmount || Math.min(...filteredAmounts)}</span>
      <span>{Math.max(...filteredAmounts)}</span>
    </div>
  </div>
)

const FilterList = ({ filterName, filterValues, selectedValue, handleFilterChange }) => (
  <ul className="mt-1 space-y-1 max-h-40 overflow-y-auto">
    {filterValues.map((subItem, index) => (
      <li
        key={index}
        className="rounded bg-black-300 bg-opacity-15 px-1 py-1 text-[12px] flex justify-between items-center cursor-pointer"
        onClick={() => handleFilterChange(filterName, subItem)}
      >
        <span className={selectedValue === subItem ? 'text-[#99e24d] font-bold' : ''}>
          {subItem}
        </span>
        {selectedValue === subItem && <FaCheckCircle className="text-[#99e24d] ml-2" />}
      </li>
    ))}
  </ul>
)

export default Filter