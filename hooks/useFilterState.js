import { useState, useEffect } from 'react'
import { filterItems } from '../utils/filterItems'

// Custom hook to manage filter state
export const useFilterState = (data, searchQuery) => {
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const searchFields = ['title', 'description'] // Fields to search for courses
    const filtered = filterItems(data, searchQuery, searchFields)
    setFilteredData(filtered)
  }, [data, searchQuery])

  return {
    filteredData,
  }
}
