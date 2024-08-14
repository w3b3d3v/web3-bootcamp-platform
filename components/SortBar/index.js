import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

const Sortbar = ({ filters, setFilters }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="text-white h-10 w-full sm:w-64">
      <div
        className={`flex w-[200px] flex-row items-center justify-center gap-1 rounded-lg ${
          isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
        } `}
      >
        <span className=" text-[14px]">{t('sortBy')}</span>
        <label>
          <select
            name="status"
            onChange={handleFilterChange}
            className={`text-white w-full border-none bg-none text-[14px] ${
              isLight ? 'text-black-400' : 'text-[#99e24d]'
            }`}
          >
            <option value="">{t('context depth')}</option>
            <option value="">{t('reward')}</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Sortbar
