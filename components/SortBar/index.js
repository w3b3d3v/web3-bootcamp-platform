import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { filteredSortbar } from './utils'

const Sortbar = ({ filters, sendFilterSortbar }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value
    setFilterName(selectedFilter)
    sendFilterSortbar(selectedFilter)
  }

  return (
    <div className="text-white h-10 w-full sm:w-64">
      <div
        className={`flex w-[200px] flex-row items-center justify-center gap-1 rounded-lg ${
          isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
        } `}
      >
        <span className="text-[14px]">{t('sortBy')}</span>
        <label>
          <select
            name="status"
            onChange={handleFilterChange}
            className={`text-white w-full border-none bg-none text-[14px] ${
              isLight ? 'text-black-400' : 'text-[#99e24d]'
            }`}
          >
            {Object.entries(filteredSortbar(filters, ['Amount', 'Context Depth'])).map(
              ([filterName]) => {
                return (
                  <option key={filterName} value={filterName.replace(/\s+/g, '')}>
                    {filterName}
                  </option>
                )
              }
            )}
          </select>
        </label>
      </div>
    </div>
  )
}

export default Sortbar
