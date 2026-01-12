import { useState } from 'react'
import Select from 'react-select'
import { useMoviesStore } from '../model/store'
import { RangeSlider } from '../../../shared/ui/slider/Slider'
import { ClearButton } from '../../../shared/ui/clear-button'
import { RadioButtonsGroup } from '../../../shared/ui/radio-button'

export const FilterPanel = () => {
  const [filterMode, setFilterMode] = useState<'search' | 'filter'>('search')
  
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    minYear: selectedMinYear,
    maxYear: selectedMaxYear,
    setYearRange,
    minRating,
    maxRating,
    setRatingRange,
    genreFilter,
    setGenreFilter,
    genres,
    clearFilters,
  } = useMoviesStore()

  const handleFilterModeChange = (mode: 'search' | 'filter') => {
    setFilterMode(mode)
    // Clear the other mode's data when switching
    if (mode === 'search') {
      clearFilters()
    } else {
      clearSearch()
    }
  }

  // Get all available years (generate range from current year back to 1900)
  const currentYear = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYear

  const getYearValue = (): [number, number] | null => {
    if (selectedMinYear !== null && selectedMaxYear !== null) {
      return [selectedMinYear, selectedMaxYear]
    }
    if (selectedMinYear !== null) {
      return [selectedMinYear, maxYear]
    }
    if (selectedMaxYear !== null) {
      return [minYear, selectedMaxYear]
    }
    return null
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Radio buttons for filter mode selection */}
      <div className="space-y-2">
        <RadioButtonsGroup
          name="filterMode"
          options={[
            { value: 'search', label: 'By name' },
            { value: 'filter', label: 'Help me narrow things down' },
          ]}
          value={filterMode}
          onChange={(value) => handleFilterModeChange(value as 'search' | 'filter')}
        />
      </div>

      {/* Section 1: Search by movie title */}
      {filterMode === 'search' && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Search by movie title</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by movie title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <ClearButton
                onClick={clearSearch}
                ariaLabel="Clear search"
                title="Clear search"
              />
            )}
          </div>
        </div>
      )}

      {/* Section 2: Help me narrow things down */}
      {filterMode === 'filter' && (
        <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-6">
          {/* Genre Filter */}
          <div className="mt-[28px] w-[400px] h-[38px]">
            <Select
              isMulti
              options={genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
              }))}
              value={genreFilter.map((genreId) => {
                const genre = genres.find((g) => g.id.toString() === genreId)
                return genre
                  ? { value: genreId, label: genre.name }
                  : null
              }).filter((option): option is { value: string; label: string } => option !== null)}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
                setGenreFilter(selectedValues)
              }}
              isClearable={true}
              isSearchable={true}
              placeholder="Select genres..."
              className="min-w-[200px]"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px',
                  maxHeight: '70px',
                  overflow: 'scroll',
                  fontSize: '14px',
                  borderColor: '#e5e7eb',
                  '&:hover': {
                    borderColor: '#3b82f6',
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  fontSize: '14px',
                  backgroundColor: state.isSelected
                    ? '#3b82f6'
                    : state.isFocused
                    ? '#eff6ff'
                    : 'white',
                  color: state.isSelected ? 'white' : '#1f2937',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff',
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#eff6ff',
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#1e40af',
                  fontSize: '14px',
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: '#1e40af',
                  '&:hover': {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                  },
                }),
              }}
            />
          </div>
          {/* Year Filter */}
          <RangeSlider
            label="Year"
            min={minYear}
            max={maxYear}
            value={getYearValue()}
            onChange={(value) => {
              if (Array.isArray(value)) {
                const [min, max] = value
                // If both are at the edges, clear
                if (min === minYear && max === maxYear) {
                  setYearRange(null, null)
                } else {
                  setYearRange(min, max)
                }
              } else {
                setYearRange(null, null)
              }
            }}
            range
            formatValue={(value) => {
              if (Array.isArray(value)) {
                const [min, max] = value
                if (min === minYear && max === maxYear) return 'All'
                if (min === minYear) return `-${max}`
                if (max === maxYear) return `${min}+`
                return `${min} - ${max}`
              }
              return 'All'
            }}
          />

          {/* Rating Filter */}
          <RangeSlider
            label="Rating"
            min={1}
            max={10}
            value={
              minRating !== null && maxRating !== null
                ? [minRating, maxRating]
                : null
            }
            onChange={(value) => {
              if (Array.isArray(value)) {
                const [min, max] = value
                // If both are at the edges (1-10), it's the default, so set to default
                if (min === 1 && max === 10) {
                  setRatingRange(1, 10)
                } else {
                  setRatingRange(min, max)
                }
              } else {
                setRatingRange(1, 10)
              }
            }}
            range
            formatValue={(value) => {
              if (Array.isArray(value)) {
                const [min, max] = value
                if (min === 1 && max === 10) return 'All'
                if (min === 1) return `-${max}`
                if (max === 10) return `${min}+`
                return `${min} - ${max}`
              }
              return 'All'
            }}
            showMaxValue={true}
          />

          {/* Clear Button */}
          <div className="mt-[28px]">
            <ClearButton
              onClick={clearFilters}
              ariaLabel="Clear all filters"
              title="Clear all filters"
            />
          </div>
        </div>
        </div>
      )}
    </div>
  )
}
