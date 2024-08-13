import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { getUniqueFields, filterIssues, getFilteredAmounts, isAmountFilterDisabled, getFilterTitle, shouldRenderAmountFilter } from './filterLogic'

export const useFilterState = (issues) => {
    const router = useRouter()
    const [filters, setFilters] = useState({})
    const [selectedFilters, setSelectedFilters] = useState({})
    const [isOpen, setIsOpen] = useState({})

    useEffect(() => {
        const filterOptions = getUniqueFields(issues)
        setFilters(filterOptions)
        setIsOpen(
            Object.keys(filterOptions).reduce((acc, filterName) => {
                acc[filterName] = false
                return acc
            }, {})
        )
    }, [issues])

    useEffect(() => {
        if (router.query) {
            const loadedFilters = Object.entries(router.query).reduce((acc, [filterName, value]) => {
                try {
                    acc[filterName] = JSON.parse(value)
                } catch {
                    acc[filterName] = value
                }
                return acc
            }, {})
            setSelectedFilters(loadedFilters)
        }
    }, [router.query])

    const toggleOpen = useCallback((filterName) => {
        if (filters[filterName]?.length > 0 && (filterName !== 'Amount' || selectedFilters['Reward'])) {
            setIsOpen((prevState) => ({
                ...prevState,
                [filterName]: !prevState[filterName],
            }))
        }
    }, [filters, selectedFilters])

    const updateURL = useCallback((updatedFilters) => {
        const query = Object.entries(updatedFilters)
            .filter(([_, value]) => value !== null && value !== undefined)
            .reduce((acc, [key, value]) => {
                acc[key] = typeof value === 'object' ? JSON.stringify(value) : value
                return acc
            }, {})

        router.push({
            pathname: router.pathname,
            query,
        }, undefined, { shallow: true })
    }, [router])

    const handleFilterChange = useCallback((filterName, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [filterName]: prevFilters[filterName] === value ? null : value,
            }
            if (filterName === 'Reward') {
                updatedFilters['Amount'] = null
            }
            updateURL(updatedFilters)
            return updatedFilters
        })
    }, [updateURL])

    const clearFilters = useCallback(() => {
        const clearedFilters = Object.keys(filters).reduce((acc, filterName) => {
            acc[filterName] = null
            return acc
        }, {})
        setSelectedFilters(clearedFilters)
        setIsOpen(
            Object.keys(filters).reduce((acc, filterName) => {
                acc[filterName] = false
                return acc
            }, {})
        )
        updateURL(clearedFilters)
    }, [filters, updateURL])

    const filteredIssues = filterIssues(issues, selectedFilters)
    const filteredAmounts = getFilteredAmounts(issues, filters, selectedFilters['Reward'])

    const getFilterProps = useCallback((filterName) => {
        return {
            isDisabled: filterName === 'Amount' && isAmountFilterDisabled(selectedFilters),
            title: getFilterTitle(filterName, selectedFilters),
            shouldRenderAmountFilter: shouldRenderAmountFilter(filterName, selectedFilters),
        }
    }, [selectedFilters])

    return {
        filters,
        selectedFilters,
        isOpen,
        toggleOpen,
        handleFilterChange,
        clearFilters,
        filteredIssues,
        filteredAmounts,
        getFilterProps,
    }
}