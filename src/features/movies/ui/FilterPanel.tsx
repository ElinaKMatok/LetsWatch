import Select from 'react-select'
import { useMoviesStore } from '../model/store'
import { RangeSlider } from '../../../shared/ui/slider/Slider'

export const FilterPanel = () => {
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

  // Get all available years (generate range from current year back to 1900)
  const currentYear = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYear
  return (
    <div className="mb-6 space-y-4">
      {/* Section 1: Search by movie title */}
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
            <button
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
              aria-label="Clear search"
              title="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Section 2: Help me narrow things down */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Help me narrow things down</label>
        <div className="flex flex-wrap items-center gap-6">
          {/* Year Filter */}
          <RangeSlider
            label="Year"
            min={minYear}
            max={maxYear}
            value={
              selectedMinYear !== null && selectedMaxYear !== null
                ? [selectedMinYear, selectedMaxYear]
                : selectedMinYear !== null
                ? [selectedMinYear, maxYear]
                : selectedMaxYear !== null
                ? [minYear, selectedMaxYear]
                : null
            }
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

          {/* Genre Filter */}
          <div className="mt-[28px]">
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

          {/* Clear Button */}
          <div className="mt-[28px]">
            <button
              onClick={clearFilters}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
              aria-label="Clear all filters"
              title="Clear all filters"
            >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
