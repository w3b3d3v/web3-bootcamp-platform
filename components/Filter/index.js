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
      className={`text-black w-[100%] rounded-lg p-2 lg:w-[20%] ${
        isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
      }`}
    >
      {/* Filter header with clear button */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">{t('filters')}</h3>
        <button onClick={clearFilters} className="text-sm font-bold">
          {t('clear')}
        </button>
      </div>
      {/* List of filter options */}
      <ul className="mx-2 flex flex-wrap items-center justify-center lg:flex-col lg:items-start">
        {Object.entries(filters).map(([filterName, filterValues]) => {
          const { isDisabled, title, shouldRenderAmountFilter } = getFilterProps(filterName)
          return (
            <li key={filterName} className="mb-2 ml-1 w-full text-[12px] lg:text-[14px]">
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
      className={`flex w-full items-center justify-between rounded bg-black-300 bg-opacity-0 px-1 py-1 ${
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
const FilterList = ({ filterName, filterValues, selectedValue, handleFilterChange }) => (
  <ul className="mt-1 max-h-40 space-y-1 overflow-y-auto">
    {filterValues.map((subItem, index) => (
      <li
        key={index}
        className="bg-opacity-15 mb-0 flex cursor-pointer items-center justify-between rounded bg-black-300 px-1 py-1 text-[12px]"
        onClick={() => handleFilterChange(filterName, subItem)}
      >
        <span className={selectedValue === subItem ? 'font-bold text-[#99e24d]' : ''}>
          {subItem}
        </span>
        {selectedValue === subItem && <FaCheckCircle className="ml-2 text-[#99e24d]" />}
      </li>
    ))}
  </ul>
)

export default Filter
