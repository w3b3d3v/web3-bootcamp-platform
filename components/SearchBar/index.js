import React from 'react'
import { useTheme } from 'next-themes'

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div className="w-[100%] p-4">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`search-bar text-white ${
          isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200'
        }`}
      />
    </div>
  )
}

export default SearchBar
