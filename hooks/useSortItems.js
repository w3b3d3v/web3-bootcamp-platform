import { useState, useMemo } from 'react'
import { sortItems } from '../utils/sortItems'

export function useSortItems(items, sortFields, initialSortBy) {
  const [sortBy, setSortBy] = useState(initialSortBy)

  const sortedItems = useMemo(() => sortItems(sortBy, items), [sortBy, items])

  const sortOptions = useMemo(
    () =>
      sortFields.reduce((acc, field) => {
        acc[field] = true
        return acc
      }, {}),
    [sortFields]
  )

  return { sortedItems, sortBy, setSortBy, sortOptions }
}
