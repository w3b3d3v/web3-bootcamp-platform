import { contextOrder } from '../../lib/utils/constants'

export const filteredSortbar = (filters, toKeep) => {
  const keys = toKeep

  return Object.keys(filters).reduce((sortBar, key) => {
    if (keys.includes(key)) {
      sortBar[key] = filters[key]
    }
    return sortBar
  }, {})
}

export const sortFilter = (sortBy, issues) => {
  // Verifica se issues é um array válido
  if (!Array.isArray(issues) || issues.length === 0) {
    return []
  }

  return [...issues].sort((a, b) => {
    switch (sortBy) {
      case 'Amount':
        const amountA = a.fields.find((f) => f.field === 'Amount')?.value || 0
        const amountB = b.fields.find((f) => f.field === 'Amount')?.value || 0
        return amountB - amountA // This will sort from highest to lowest
      case 'ContextDepth':
        const contextA = contextOrder[a.fields.find((f) => f.field === 'Context Depth')?.value] || 0
        const contextB = contextOrder[b.fields.find((f) => f.field === 'Context Depth')?.value] || 0
        return contextA - contextB // This will sort from lowest to highest
      default:
        return 0
    }
  })
}
