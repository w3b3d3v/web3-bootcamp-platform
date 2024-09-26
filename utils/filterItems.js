// Utility function to filter items based on search query
export const filterItems = (items, searchQuery, searchFields = []) => {
  return items.filter((item) => {
    return searchFields.some((field) => {
      let content = ''
      if (field === 'title' && item.metadata) {
        // Get all titles from the metadata
        const titles = Object.values(item.metadata)
          .filter((meta) => meta?.title)
          .map((titleObj) => titleObj.title)
        // Check if any of the titles includes the search query
        return titles.some((title) => title.toLowerCase().includes(searchQuery.toLowerCase()))
      } else {
        content = item[field]
      }

      return content && content.toLowerCase().includes(searchQuery.toLowerCase())
    })
  })
}
