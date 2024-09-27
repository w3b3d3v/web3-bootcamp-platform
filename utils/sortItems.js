import { contextOrder } from "../lib/utils/constants"

export const sortItems = (sortBy, issues) => {
  return [...issues].sort((a, b) => {
    switch (sortBy) {
      case 'Amount':
        const amountA = a.fields.find((f) => f.field === 'Amount')?.value
        const amountB = b.fields.find((f) => f.field === 'Amount')?.value
        return amountA - amountB
      case 'ContextDepth':
        const contextA = contextOrder[a.fields.find((f) => f.field === 'Context Depth')?.value] || 0
        const contextB = contextOrder[b.fields.find((f) => f.field === 'Context Depth')?.value] || 0
        return contextA - contextB
      default:
        return 0
    }
  })
}