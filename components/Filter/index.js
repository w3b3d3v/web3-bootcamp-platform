import React from 'react'
import { FaRegCaretSquareDown, FaRegCaretSquareUp, FaCheckCircle } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

// Main Filter component
const Filter = ({
  filters,
  selectedFilters,
  isOpen,
  toggleOpen,
  handleFilterChange,
  clearFilters,
  filteredAmounts,
  getFilterProps,
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isLight = theme === 'light'

  return (
    <div
      className={`text-black  w-[100%] lg:w-[20%] rounded-lg p-2 ${
        isLight ? 'bg-[#96E150] font-semibold' : 'bg-black-200 bg-opacity-75'
      }`}
    >
      {/* Filter header with clear button */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">{t('filters')}</h3>
        <button onClick={clearFilters} className={`text-sm font-bold  hover:ring-1 
          ${isLight ? 'hover:ring-[#1E96FF] bg-[#1E96FF]' : 'hover:ring-[#96E150] bg-[#96E150]'} bg-opacity-50 rounded-md px-2`}>
          {t('clear')}
        </button>
      </div>
      {/* List of filter options */}
      <ul className="mx-2 flex flex-wrap items-center justify-center lg:flex-col lg:items-start">
        {Object.entries(filters).map(([filterName, filterValues]) => {
          const { isDisabled, title, shouldRenderAmountFilter } = getFilterProps(filterName)
          return (
            <li key={filterName} className={`mb-2 ml-1 w-full text-[12px] lg:text-[14px] ring-1 rounded-[10px] 
            ${isLight ? 'ring-[#1E96FF] hover:ring-2' : 'ring-[#96E150] hover:ring-2'}`}>
              {/* Filter header for each filter type */}
              <FilterHeader
                filterName={filterName}
                isOpen={isOpen[filterName]}
                toggleOpen={toggleOpen}
                isDisabled={isDisabled}
                title={title}
              />
              {/* Render filter content when open */}
              {isOpen[filterName] &&
                (shouldRenderAmountFilter ? (
                  <AmountFilter
                    filteredAmounts={filteredAmounts}
                    selectedAmount={selectedFilters[filterName]}
                    handleFilterChange={handleFilterChange}
                  />
                ) : (
                  <FilterList
                    filterName={filterName}
                    filterValues={filterValues}
                    selectedValue={selectedFilters[filterName]}
                    handleFilterChange={handleFilterChange}
                    isLight={isLight}
                  />
                ))}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Component for filter headers
const FilterHeader = ({ filterName, isOpen, toggleOpen, isDisabled, title }) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={() => toggleOpen(filterName)}
      className={`flex w-full items-center justify-between rounded bg-black-300 bg-opacity-0 px-1 py-1 font-semibold ${
        isDisabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      disabled={isDisabled}
      title={title}
    >
      <span className="capitalize">{t(filterName.replace(/([A-Z])/g, ' $1').toLowerCase())}</span>
      {isOpen ? <FaRegCaretSquareUp className="ml-2" /> : <FaRegCaretSquareDown className="ml-2" />}
    </button>
  )
}

// Component for Amount filter (range input)
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
    {/* Display min, current, and max values */}
    <div className="mt-1 flex justify-between text-xs">
      <span>{Math.min(...filteredAmounts)}</span>
      <span>{selectedAmount || Math.min(...filteredAmounts)}</span>
      <span>{Math.max(...filteredAmounts)}</span>
    </div>
  </div>
)

// Component for filter list (for non-Amount filters)
const FilterList = ({ filterName, filterValues, selectedValue, handleFilterChange, isLight }) => (
  <ul className="mt-1 max-h-40 space-y-1 overflow-y-auto">
    {filterValues.map((subItem, index) => (
      <li
        key={index}
        className={`mb-0 mx-1 flex cursor-pointer items-center justify-between rounded-lg px-1 py-1 text-[14px] ${
          isLight ? 'bg-[#1E96FF] hover:bg-opacity-100 bg-opacity-50' : 'bg-black-100 bg-opacity-15 hover:ring-1 hover:ring-[#96E150]'
        }`}
        onClick={() => handleFilterChange(filterName, subItem)}
      >
        <span className={`${selectedValue === subItem ? 'font-bold' : ''} ${isLight ? 'text-black' : 'text-[#96E150]'}`}>
          {subItem}
        </span>
        {selectedValue === subItem && <FaCheckCircle className={`ml-2 ${isLight ? 'text-black' : 'text-[#96E150]'}`} />}
      </li>
    ))}
  </ul>
)

export default Filter
