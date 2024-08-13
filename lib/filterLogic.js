export const getUniqueFields = (issues) => {
    const uniqueFields = {}
    issues.forEach(issue => {
        issue.fields.forEach(({ field, value }) => {
            if (!uniqueFields[field]) {
                uniqueFields[field] = new Set()
            }
            uniqueFields[field].add(value)
        })
    })
    return Object.fromEntries(
        Object.entries(uniqueFields).map(([field, values]) => [field, Array.from(values)])
    )
}

export const filterIssues = (issues, filters) => {
    return issues.filter((issue) => {
        return Object.keys(filters).every(filterKey => {
            if (!filters[filterKey]) return true
            return issue.fields.some(field => field.field === filterKey && field.value === filters[filterKey])
        })
    })
}

export const getFilteredAmounts = (issues, filters, selectedReward) => {
    if (!selectedReward) return []
    return filters['Amount']
        .filter(amount =>
            issues.some(issue =>
                issue.fields.some(field => field.field === 'Amount' && field.value === amount) &&
                issue.fields.some(field => field.field === 'Reward' && field.value === selectedReward)
            )
        )
        .sort((a, b) => a - b)
}

export const isAmountFilterDisabled = (selectedFilters) => {
    return !selectedFilters['Reward']
}

export const getFilterTitle = (filterName, selectedFilters) => {
    if (filterName === 'Amount' && isAmountFilterDisabled(selectedFilters)) {
        return 'Select a reward first'
    }
    return ''
}

export const shouldRenderAmountFilter = (filterName, selectedFilters) => {
    return filterName === 'Amount' && !isAmountFilterDisabled(selectedFilters)
}