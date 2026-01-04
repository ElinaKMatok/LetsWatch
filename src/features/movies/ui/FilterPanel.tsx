type FilterPanelProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
  yearFilter: string
  onYearChange: (value: string) => void
  ratingFilter: string
  onRatingChange: (value: string) => void
  genreFilter: string
  onGenreChange: (value: string) => void
  availableYears: number[]
  availableGenres: Array<{ id: number; name: string }>
  onClear: () => void
}

export const FilterPanel = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  yearFilter,
  onYearChange,
  ratingFilter,
  onRatingChange,
  genreFilter,
  onGenreChange,
  availableYears,
  availableGenres,
  onClear,
}: FilterPanelProps) => {
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
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
        <div className="flex flex-wrap items-center gap-3">
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

          {/* Genre Filter */}
          <select
            id="genre-filter"
            value={genreFilter}
            onChange={(e) => onGenreChange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="">All Genres</option>
            {availableGenres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
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
      </div>
    </div>
  )
}
