import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// Extract unique field values from issues
export const getUniqueFieldValues = (issues) => {
  const uniqueFieldValues = {}
  issues.forEach((issue) => {
    issue.fields.forEach(({ field, value }) => {
      if (!uniqueFieldValues[field]) {
        uniqueFieldValues[field] = new Set()
      }
      uniqueFieldValues[field].add(value)
    })
  })
  // Convert Sets to Arrays for each field
  return Object.fromEntries(
    Object.entries(uniqueFieldValues).map(([field, values]) => [field, Array.from(values)])
  )
}

// Filter issues based on selected filters
export const filterIssuesBySelectedFilters = (issues, selectedFilters) => {
  return issues.filter((issue) =>
    Object.entries(selectedFilters).every(
      ([filterName, selectedValue]) =>
        !selectedValue ||
        issue.fields.some((field) => field.field === filterName && field.value === selectedValue)
    )
  )
}

// Get options for the Amount filter based on selected Reward
export const getAmountFilterOptions = (issues, filters, selectedReward) => {
  const { t } = useTranslation()
  const isAmountFilterDisabled = !selectedReward
  const amountFilterTitle = isAmountFilterDisabled ? t('selectRewardFirst') : ''
  const availableAmounts = isAmountFilterDisabled
    ? []
    : filters['Amount']
        .filter((amount) =>
          issues.some(
            (issue) =>
              issue.fields.some((field) => field.field === 'Amount' && field.value === amount) &&
              issue.fields.some(
                (field) => field.field === 'Reward' && field.value === selectedReward
              )
          )
        )
        .sort((a, b) => a - b)

  return { isAmountFilterDisabled, amountFilterTitle, availableAmounts }
}

// Custom hook to manage filter state
export const useFilterState = (issues) => {
  const router = useRouter()
  const [filters, setFilters] = useState({})
  const [selectedFilters, setSelectedFilters] = useState({})
  const [isOpen, setIsOpen] = useState({})

  // Initialize filters and open state
  useEffect(() => {
    const availableFilterOptions = getUniqueFieldValues(issues)
    setFilters(availableFilterOptions)
    setIsOpen(
      Object.keys(availableFilterOptions).reduce((openState, filterName) => {
        openState[filterName] = false
        return openState
      }, {})
    )
  }, [issues])

  // Update selected filters based on URL query parameters
  useEffect(() => {
    if (router.query) {
      const filtersFromUrl = Object.entries(router.query).reduce(
        (urlFilters, [filterName, value]) => {
          if (filterName !== 'lang') {
            // Ignore the 'lang' parameter
            try {
              urlFilters[filterName] = JSON.parse(value)
            } catch {
              urlFilters[filterName] = value
            }
          }
          return urlFilters
        },
        {}
      )
      setSelectedFilters(filtersFromUrl)
    }
  }, [router.query])

  // Toggle filter dropdown open/close state
  const toggleFilterDropdown = useCallback(
    (filterName) => {
      if (
        filters[filterName]?.length > 0 &&
        (filterName !== 'Amount' || selectedFilters['Reward'])
      ) {
        setIsOpen((currentOpenState) => ({
          ...currentOpenState,
          [filterName]: !currentOpenState[filterName],
        }))
      }
    },
    [filters, selectedFilters]
  )

  // Update URL with current filter state
  const updateUrlWithFilters = useCallback(
    (updatedFilters) => {
      const queryParams = Object.entries(updatedFilters)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((params, [key, value]) => {
          params[key] = typeof value === 'object' ? JSON.stringify(value) : value
          return params
        }, {})

      // Preserve the 'lang' parameter if it exists
      if (router.query.lang) {
        queryParams.lang = router.query.lang
      }

      router.push(
        {
          pathname: router.pathname,
          query: queryParams,
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  // Handle filter selection/deselection
  const handleFilterSelection = useCallback(
    (filterName, value) => {
      setSelectedFilters((currentFilters) => {
        const updatedFilters = {
          ...currentFilters,
          [filterName]: currentFilters[filterName] === value ? null : value,
        }
        if (filterName === 'Reward') {
          updatedFilters['Amount'] = null
          setIsOpen((currentOpenState) => ({
            ...currentOpenState,
            Amount: updatedFilters['Reward'] !== null,
          }))
        }
        updateUrlWithFilters(updatedFilters)
        return updatedFilters
      })
    },
    [updateUrlWithFilters]
  )

  // Clear all selected filters
  const clearAllFilters = useCallback(() => {
    const resetFilters = Object.keys(filters).reduce((clearedFilters, filterName) => {
      clearedFilters[filterName] = null
      return clearedFilters
    }, {})
    setSelectedFilters(resetFilters)
    setIsOpen(
      Object.keys(filters).reduce((closedState, filterName) => {
        closedState[filterName] = false
        return closedState
      }, {})
    )
    updateUrlWithFilters(resetFilters)
  }, [filters, updateUrlWithFilters])

  // Apply filters to issues
  const filteredIssues = filterIssuesBySelectedFilters(issues, selectedFilters)
  const { isAmountFilterDisabled, amountFilterTitle, availableAmounts } = getAmountFilterOptions(
    issues,
    filters,
    selectedFilters['Reward']
  )

  // Get props for filter components
  const getFilterComponentProps = useCallback(
    (filterName) => ({
      isDisabled: filterName === 'Amount' && isAmountFilterDisabled,
      title: filterName === 'Amount' ? amountFilterTitle : '',
      shouldRenderAmountFilter: filterName === 'Amount' && !isAmountFilterDisabled,
    }),
    [isAmountFilterDisabled, amountFilterTitle]
  )

  return {
    filters,
    selectedFilters,
    isOpen,
    toggleFilterDropdown,
    handleFilterSelection,
    clearAllFilters,
    filteredIssues,
    availableAmounts,
    getFilterComponentProps,
  }
}
