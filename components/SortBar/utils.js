export const filteredSortbar = (filters, toKeep) => {
  const keys = toKeep

  return Object.keys(filters).reduce((sortBar, key) => {
    if (keys.includes(key)) {
      sortBar[key] = filters[key]
    }
    return sortBar
  }, {})
}