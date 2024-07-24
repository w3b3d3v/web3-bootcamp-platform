import React from 'react'
import { useTheme } from 'next-themes'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <div className="p-4 w-[100%]">
      <input
        type="text"
        placeholder="Search project title & description"
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
