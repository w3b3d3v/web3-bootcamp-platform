import React from 'react'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-4 w-[100%]">
      <input
        type="text"
        placeholder="Search project title & description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
    </div>
  )
}

export default SearchBar
