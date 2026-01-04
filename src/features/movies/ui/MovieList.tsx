import { useEffect } from 'react'
import { useMoviesStore } from '../model/store'
import { MovieCard } from './MovieCard'
import { MovieDrawer } from './MovieDrawer'
import { FilterPanel } from './FilterPanel'
import { PaginationPanel } from './PaginationPanel'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { EmptyState } from '../../../shared/ui/empty-state'

export const MovieList = () => {
  const {
    movies,
    genres,
    loading,
    error,
    selectedMovieId,
    isDrawerOpen,
    searchQuery,
    minYear,
    maxYear,
    minRating,
    maxRating,
    genreFilter,
    currentPage,
    totalPages,
    loadGenres,
    loadMovies,
    openDrawer,
    closeDrawer,
    setCurrentPage,
  } = useMoviesStore()

  // Load genres on mount
  useEffect(() => {
    loadGenres()
  }, [loadGenres])

  // Load movies based on filters with debouncing
  useEffect(() => {
    // Debounce search input by 1000ms (1 second) when only search is used
    // Debounce year/rating filters by 1500ms (1.5 seconds)
    // For genre filter or page changes, load immediately
    
    const hasYearFilter = minYear !== null || maxYear !== null
    const hasRatingFilter = minRating !== 1 || maxRating !== 10
    const hasSearch = searchQuery.trim()
    const hasOnlySearch = hasSearch && !hasYearFilter && !hasRatingFilter && genreFilter.length === 0
    const hasYearOrRating = hasYearFilter || hasRatingFilter
    
    let debounceTime = 0
    if (hasOnlySearch) {
      debounceTime = 1000 // 1 second for search
    } else if (hasYearOrRating) {
      debounceTime = 1500 // 1.5 seconds for year/rating filters
    }
    
    const timeoutId = setTimeout(() => {
      loadMovies()
    }, debounceTime)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage, minYear, maxYear, minRating, maxRating, genreFilter])

  if (loading) {
    return (
      <>
        <FilterPanel />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 font-semibold">Error loading movies</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <p className="text-red-600 text-xs mt-2">
          Make sure you have set VITE_TMDB_API_KEY in your .env file
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Filters - Sticky */}
      <div className="sticky top-0 bg-gray-100 z-20 pb-2">
        <FilterPanel />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Movies Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                onClick={() => openDrawer(movie.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No movies found"
            message={
              searchQuery || minYear !== null || maxYear !== null || minRating !== 1 || maxRating !== 10 || genreFilter.length > 0
                ? 'Try adjusting your filters or search query'
                : 'No movies available at the moment'
            }
          />
        )}

        {/* Pagination */}
        <PaginationPanel
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <MovieDrawer
        movieId={selectedMovieId}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </div>
  )
}
