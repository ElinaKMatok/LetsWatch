type FilterPanelProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  yearFilter: string
  onYearChange: (value: string) => void
  ratingFilter: string
  onRatingChange: (value: string) => void
  availableYears: number[]
  onClear: () => void
}

export const FilterPanel = ({
  searchQuery,
  onSearchChange,
  yearFilter,
  onYearChange,
  ratingFilter,
  onRatingChange,
  availableYears,
  onClear,
}: FilterPanelProps) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or genre..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />

      {/* Year Filter */}
      <select
        id="year-filter"
        value={yearFilter}
        onChange={(e) => onYearChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
      >
        <option value="">All Years</option>
        {availableYears.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>

      {/* Rating Filter */}
      <select
        id="rating-filter"
        value={ratingFilter}
        onChange={(e) => onRatingChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
      >
        <option value="">All Ratings</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
      </select>

      {/* Clear Button */}
      <button
        onClick={onClear}
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
  )
}
